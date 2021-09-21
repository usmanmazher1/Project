const express = require('express');

const router = express.Router();
const jobs = require('../controller/jobcontroller')
router.route('/').get(jobs.jobget).post(jobs.jobinsert);
router.route('/:job_id').get(jobs.jobgetbyid).put(jobs.jobupdated).delete(jobs.jobdeleted)
module.exports = router;