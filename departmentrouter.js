const express = require('express');
const client = require('./client');
const router = express.Router();
router.route('/').get(async function(req,res){
    try {
        // let query = "SELECT * FROM company";
       await client.query(`SELECT * FROM "department"`,function(err,result){
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
          
 }).post( async function(req,res){
    try {
       // var company_id =  client.query(`SELECT company_id FROM "company" `);
        //console.log(company_id);
      let {department_name,company_id} = req.body;
      await client.query(`INSERT INTO "department" (department_name,company_id) VALUES($1,$2)`,[department_name,company_id],function(err,result){
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
  router.route('/:department_id').get(async function(req,res){
    try {
      //let query = "SELECT * FROM company";
      let {department_id} = req.params;
    //   console.log(company_id);
      //let {company_name} = req.body
    await client.query(`SELECT * FROM "department" WHERE department_id=$1 `,[department_id],function(error,result){
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
      let {department_id} = req.params;
      //const pool = client.query(`Select * from "company"`);
      let {department_name,company_id} = req.body;
      //var updateData=req.body;
      //var sql = `UPDATE users SET ? WHERE id= ?`
     await client.query(`Update "department" SET department_name = $1 ,company_id = $2 WHERE department_id=$3`,[department_name,company_id,department_id],function(error,result){
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
      let {department_id} = req.params
     await client.query(`Delete From "department" WHERE department_id=$1`,[department_id],function(error,result){
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