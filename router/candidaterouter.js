const express = require('express');
const client = require('../client');
const router = express.Router();
router.route('/').get(function(req,res){
    try {
      // let query = "SELECT * FROM company";
      client.query(`SELECT * FROM "candidate"`,function(err,result){
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
      
  }).post(function(req,res){
    try {
       // const compname=  client.query(`SELECT company_name FROM "company" `)
      let {candidate_name,email,phone,urls,prev_company} = req.body
      client.query(`INSERT INTO "candidate" (candidate_name,email,phone,urls,prev_company) VALUES($1,$2,$3,$4,$5)`,[candidate_name,email,phone,urls,prev_company],function(err,result){
          if(err){
              console.log(err.message);
          }
          else{
            res.json({
              status:201,
              data:result.rows[0]  
            })
           // console.log(result.rows);
          }
      })
    } catch (error) {
        console.log(error.message);
    }
      
  })
  router.route('/:candidate_id').get(function(req,res){
    try {
      //let query = "SELECT * FROM company";
      let {candidate_id} = req.params;
    //   console.log(company_id);
      //let {company_name} = req.body
     client.query(`SELECT * FROM "candidate" WHERE candidate_id=$1 `,[candidate_id],function(error,result){
        if(!error){
            res.json({
                data:result.rows,
            })
           }
           else{
               console.log(error.message);
           }

     })
    
       
    } catch (error) {
        console.log(error.message);
    }
      
  }).put(async function(req,res){
      try {
        //let query = "SELECT * FROM company"; 
        let {candidate_id} = req.params;
        //const pool = client.query(`Select * from "company"`);
        let {candidate_name,email,phone,urls,prev_company} = req.body;
        //var updateData=req.body;
        //var sql = `UPDATE users SET ? WHERE id= ?`
          client.query(`Update "candidate" SET candidate_name = $1 , email = $2 , phone = $3 , urls = $4 , prev_company = $5 WHERE candidate_id=$6`,[candidate_name,email,phone,urls,prev_company,candidate_id],function(error,result){
              if(!error){
               res.json({
                   msg:"data updated",
               })
              }
              else{
                  console.log(error.message);
              }
          }) 
           
      } catch (error) {
          console.log(error.message);
      }
        
    }).delete(async function(req,res){
      try {
        //let query = "SELECT * FROM company";
        let {candidate_id} = req.params
        client.query(`Delete From "candidate" WHERE candidate_id=$1`,[candidate_id],function(error,result){
            if(!error){
             res.json({
                 msg:"Data Deleted",
             })
            }
            else{
                console.log(error.message);
            }
        })
         
      } catch (error) {
          console.log(error.message);
      }
        
    })

    module.exports = router;