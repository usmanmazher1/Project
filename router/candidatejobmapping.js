const express = require('express');
const client = require('../client');
const router = express.Router();
router.route('/').get(function(req,res){
    try {
      // let query = "SELECT * FROM company";
      client.query(`select u.user_name,j.job_title,c.candidate_name from "candidate_job_maping" cjm join "candidate" c on cjm.candidate_id = c.candidate_id join "job" j ON cjm.job_id =j.job_id join "users" u on j.user_id = u.user_id `,function(err,result){
          if(err){
              console.log(err.message);
          }
          else{
            res.json({
              status:200,
              count: result.rows.length,
              data:result.rows
            })
           console.log(result.rows.length);
          }
      })
    } catch (error) {
        console.log(error.message);
    }
      
  })