import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {



  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest('no job found with that id')
    }
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async removeJob(jobId, userId) {
    const jobToRemove = await this.getJobById(jobId)
    if (jobToRemove.creatorId.toString() != userId) { throw new Forbidden('no permission') }
    await jobToRemove.remove()
  }
  async updateJob(jobId, userId, jobData) {
    const ogJob = await this.getJobById(jobId)
    if (ogJob.creatorId.toString() != userId) {
      throw new Forbidden('access denied')
    }
    ogJob.title = jobData.title || ogJob.title
    ogJob.description = jobData.description || ogJob.description
    ogJob.pay = jobData.pay || ogJob.pay
    await ogJob.save()
    return ogJob
  }


}
export const jobsService = new JobsService()