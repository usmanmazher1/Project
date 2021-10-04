const express = require('express')
const router = express.Router() ;

const interview = require('../controller/addInterview')

router.post('/schedule',interview.interviewSchedule)

router.put('/feedback/:interviewer_status_id',interview.updateFeedback)

router.get('/', interview.InterviewList)
router.get('/user_id', interview.userInterviewList)

module.exports = router ;