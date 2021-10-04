const express = require('express');
require('dotenv').config();
const client = require('./client');
const cors = require('cors');
const app = express();
const login = require('./router/auth')
const candidaterouters = require('./router/candidaterouter');
const companyrouters = require('./router/companyrouter');
const rolerouters = require('./router/rolerouter');
const userrouters = require('./router/userrouters');
const departmentrouters = require('./router/departmentrouter');
const userrolerouters = require('./router/userrolerouter');
const jobrouters = require('./router/jobrouters');
const candidate_job_maping = require('./router/candidatejobmapping');
const teamsrouter = require('./router/team')
const interview = require('./router/interview')
app.use(express.json());
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
    // app.use('/users',userrouters);
   //  app.use('/userbyrole',userrolerouters);
     app.use('/job',jobrouters);
     app.use('/candidatebyjob',candidate_job_maping);
     app.use('/team',teamsrouter)
     app.use('/auth',login);  
     app.use('/interview',interview);

 

