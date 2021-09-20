
const msal = require('@azure/msal-node');
const { Pool } = require('pg');
const pool = require("./client")

const REDIRECT_URI = 'http://localhost:2500/auth/outlook/redirect';

var OUTLOOK_CLIENT_ID = '3341d794-2702-4fa1-bfc7-a5d1c9553e7b';
var OUTLOOK_CLIENT_SECRET = 'STY7Q~Ldef1vkxPZ06hnZCLU6z6w2FXajNlcH';

const config = {
    auth: {
        clientId: '3341d794-2702-4fa1-bfc7-a5d1c9553e7b',
        authority: "https://login.microsoftonline.com/4815bcf5-bf11-4348-8e31-c512254994b7",
        clientSecret: encodeURI('STY7Q~Ldef1vkxPZ06hnZCLU6z6w2FXajNlcH')
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

const outlookLogin = (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: 'http://localhost:2500/auth/outlook/redirect',
    };

    // get url to sign user in and consent to scopes needed for application
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
};

const outlookLoginCallback = (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: 'http://localhost:2500/auth/outlook/redirect',
    };

    pca.acquireTokenByCode(tokenRequest).then(async (response) => {
        console.log("\nResponse: \n:", response);
        if (response.account) {
            let email = response.account.username.toLocaleLowerCase() ;
            console.log(email.toLocaleLowerCase())
           //await Pool.connect();
            const chk_email =await pool.query(`select * from users where email = '${email}'`)
            console.log(chk_email.rows)
            if (chk_email.rows.length===0) {
                res.send({statusCode: 403, message:'User not exist'})
            } else {
                res.send({statusCode:200, token:response.accessToken})
            }

        }
        res.send("loged in " );
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
};


module.exports = {
    outlookLogin,
    outlookLoginCallback
}