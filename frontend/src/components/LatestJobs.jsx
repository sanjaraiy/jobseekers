import React from 'react'
import JobCard from './JobCard';

const radomJob = [1,2,3,4,5,6,7,8];
function LatestJobs() {
  return (
    <div className='max-w-5xl  mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Job Openings</h1>
        {/* Cards */}
        <div className='grid grid-cols-3 gap-4 mx-auto my-5'>
        {
            radomJob.slice(0,6).map((item, idx) => (
                <JobCard key={idx}></JobCard>
            ))
        }
        </div>

    </div>
  )
}

export default LatestJobs