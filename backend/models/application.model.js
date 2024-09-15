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
        enum: ['pending','rejected','accepted'],
        default: 'pending'
    }
}, {timestamps: true});

export const Application = mongoose.model('Application', applicationSchema);
