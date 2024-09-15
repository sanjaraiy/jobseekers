import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: [true, 'This title is already used']
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
    experience: {
        type: Number,
        required: [true, 'Experience is required']
    },
    position: {
        type: Number,
        required: [true, 'Position is required'],
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
