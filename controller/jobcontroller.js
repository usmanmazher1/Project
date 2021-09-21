const express = require('express');
const client = require('../client');
const pg = require('pg');
const jobget = async function(req,res){
    try {
      // let query = "SELECT * FROM company";
      client.query(`SELECT * FROM "job"`,function(err,result){
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
      
  }
 const jobinsert = async function(req,res){
    try {
       // const compname=  client.query(`SELECT company_name FROM "company" `)
      let {job_title,job_loc,job_createdby,department_id,user_id} = req.body
     await client.query(`INSERT INTO "job" (job_title,job_loc,job_createdby,department_id,user_id) VALUES($1,$2,$3,$4,$5)`,[job_title,job_loc,job_createdby,department_id,user_id],function(err,result){
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
      
  }
  const jobupdated = async function(req,res){
    try {
      //let query = "SELECT * FROM company"; 
      let {job_id} = req.params;
      //const pool = client.query(`Select * from "company"`);
      let {job_title,job_loc,job_createdby,department_id,user_id} = req.body;
      //var updateData=req.body;
      //var sql = `UPDATE users SET ? WHERE id= ?`
       await client.query(`Update "job" SET job_title = $1 , job_loc = $2 , job_createdby = $3, department_id = $4,user_id = $5 WHERE job_id =$6`,[job_title,job_loc,job_createdby,department_id,user_id,job_id],function(error,result){
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
      
  }
  const jobgetbyid = async function(req,res){
    try {
      //let query = "SELECT * FROM company";
      let {role_id} = req.params;
    //   console.log(company_id);
      //let {company_name} = req.body
     client.query(`SELECT * FROM "job" WHERE job_id=$1 `,[job_id],function(error,result){
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
      
  }
const jobdeleted = async function(req,res){
    try {
      //let query = "SELECT * FROM company";
      let {job_id} = req.params
      client.query(`Delete From "job" WHERE job_id=$1`,[job_id],function(error,result){
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
      
  }
  module.exports = {
      jobinsert,jobgetbyid,jobdeleted,jobget,jobupdated
  }