const express = require("express");
const router = express.Router();
const controllerJobs = require("../controller/jobs")

router.route("/jobs").get(controllerJobs.jobsGetAll)
.post(controllerJobs.jobsAddOne);

router.route("/jobs/:jobId").get(controllerJobs.jobsGetOne)
.put(controllerJobs.jobsFullUpdateOne)
.patch(controllerJobs.jobsPartialUpdateOne)
.delete(controllerJobs.jobsDeleteOne);



module.exports = router;