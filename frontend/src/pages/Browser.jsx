import JobOnly from '@/components/JobOnly';
import Navbar from '@/components/Navbar';
import React from 'react'

const randomJobs = [1,2,3];

function Browser() {
  return (
    <div>
       <Navbar></Navbar>
       <div className='max-w-5xl mx-auto my-10'>
       <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
       
        <div className='grid grid-cols-3 gap-4'>
            {
                randomJobs.map((item, idx) => (
                    <JobOnly></JobOnly>
                ))
            }
        </div>
       </div>
    </div>
  )
}

export default Browser