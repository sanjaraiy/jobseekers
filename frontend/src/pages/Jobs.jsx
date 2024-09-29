import FilterCard from "@/components/FilterCard";
import JobOnly from "@/components/JobOnly";

import React from "react";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard></FilterCard>
          </div>

          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                    {
                        jobsArray.map((item, index) => (
                            <div>
                                <JobOnly></JobOnly>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
