const mongoose = require("mongoose");

//const schema = {
//    description: "Test Appointment",
//    date: "20/04/4200",
//    created: "20/04/4200",
//    urgency: "low"
//}

const appointSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    urgency: {
        type: String,
        lowercase: true,
        required: [true, "Urgeny is required"]
    }
}) 

module.exports.apptSchema = appointSchema;