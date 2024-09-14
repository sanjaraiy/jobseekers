import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide full Name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide valid email address'],
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, 'Please provide your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    role: {
        type: String,
        enum: ['STUDENT','RECRUITER'],
        // default: 'STUDENT',
        required: true,
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},  //URL to resume file
        resumeOriginalName: {type: String},
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        profilePhoto: {
            type: String,
            default: "",
        }
    }
}, {timestamps:true});


export const User = mongoose.model('User', userSchema);