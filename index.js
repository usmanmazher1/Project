const express = require('express');
require('dotenv').config();
const client = require('./client');
const cors = require('cors');
const app = express();
const candidaterouters = require('./router/candidaterouter');
const companyrouters = require('./router/companyrouter');
const rolerouters = require('./router/rolerouter');
const userrouters = require('./router/userrouters');
const departmentrouters = require('./router/departmentrouter');
const userrolerouters = require('./router/userrolerouter');
const jobrouters = require('./router/jobrouters');
const login = require('./login')
app.use(express.json());
app.use(cors());
app.use(cors());
app.listen(process.env.DB_PORT || 2500, () => {
    console.log("Server is now listening at port 2500");
})

client.connect()
    .then(() => console.log("Db is connected"))
    .catch((error) => console.log(error.message))
     app.use('/candidate',candidaterouters);
     app.use('/company',companyrouters);
     app.use('/role',rolerouters);  
     app.use('/department',departmentrouters);
     app.use('/user',userrouters);
     //app.use('/users',userrouters);
     app.use('/userbyrole',userrolerouters);
     app.use('/job',jobrouters);
     app.get('/auth/outlook', login.outlookLogin);  
     app.get('/auth/outlook/redirect', login.outlookLoginCallback);


 

