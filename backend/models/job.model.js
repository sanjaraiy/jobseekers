import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    requirements: [
         {type: String}
    ],
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
        required: [true, 'location is required'],
    },
    jobType: {
        type: String,
        required: [true, 'JobType is required'],
    },
    noOfPositions: {
        type: Number,
        required: [true, 'No of positions are required'],
    },
    company: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Company', 
       required: [true, 'Company is required'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Recuiter is required'],
    },
    applications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
}, {timestamps: true});

export const Job = mongoose.model('Job',jobSchema);
