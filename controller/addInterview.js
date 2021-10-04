const pool = require("../client")


const InterviewList = async (req, res)=> {
    try {
        let users = await pool.query(`select * from interviewer_status`)
        console.log('users', users.rows);
        //pool.end()
        res.json({statusCode: 200, users: users.rows})
    } 
    
    catch (err) {

        console.error(err.message)
        throw err
    }
}

const interviewSchedule = async (req, res)=>{
    try {
        console.log(req.body)
        const candidate_job_maping_id = req.body.candidate_job_maping_id ;
        const interview_time = req.body.scheduled_time ;
        const interviewer_id = req.body.interviewer_id;
        const stage = req.body.stage;
        const status = "PENDING"
        let candidateDetail = await pool.query(`insert into "interviewer_status"
         (candidate_job_maping_id, scheduled_time, user_id, status, stage, feedback )
         values ($1, $2, $3, $4, $5, $6)`,[candidate_job_maping_id, interview_time, interviewer_id,status, stage,'.' ]);
     //pool.end()
     res.send({statusCode: 201, message:'Added Successfuly'})
    } catch (err) { 
        console.error(err.message)
        return err
    }
}


const updateFeedback = async (req, res)=>{
    try {
        const interviewer_status_id = req.params.interviewer_status_id;
        const feedback = req.body.feedback;
        const status = req.body.status; 
        const db = req.body;
        console.log(db);
        let interviewerFeedback = await pool.query(`UPDATE "interviewer_status" set feedback = $1, status= $2 
        where interviewer_status_id = $3`,[feedback, status,interviewer_status_id ]);
         console.log(interviewerFeedback)
     //pool.end()
     res.json({statusCode: 201, message:'updated Successfuly'})
    } catch (err) { 
        console.error(err.message)
        return err ;
    }
}

const userInterviewList = async (req, res)=>{
    try {
        let myinterviewerList = await pool.query(`select interviewer_status_id, scheduled_time,
        c.candidate_name, j.job_title, is2.status, is2.stage, feedback
        from interviewer_status is2 join candidate_job_maping cjm on cjm.candidate_job_maping_id  = is2.candidate_job_maping_id 
        join candidate c on c.candidate_id = cjm.candidate_id 
        join job j on j.job_id = cjm.job_id
        where is2.user_id =${req.params.user_id} `)
        console.log('users', myinterviewerList.rows);
        //pool.end()
        res.json({statusCode: 200, users: myinterviewerList.rows})
    } 
    
    catch (err) {

        console.error(err.message)
        throw err
    }
}





module.exports={
    InterviewList,
    interviewSchedule,
    updateFeedback,
    userInterviewList
}