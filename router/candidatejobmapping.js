const express = require('express');
const client = require('../client');
const candidate_job = require('../controller/candidatejobmapping')
const router = express.Router();
router.route('/').get(candidate_job.candidate_jobget);
  module.exports = router;