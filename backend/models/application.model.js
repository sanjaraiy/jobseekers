import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job title is required']
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Applicant name is required'],
    },
    status: {
        type: String,
        enum: ['Pending','Rejected','Accepted'],
        default: 'Pending'
    }
}, {timestamps: true});

export const Application = mongoose.model('Application', applicationSchema);
