const mongoose = require("mongoose");
const dbSchema = require("./dbSchema");

mongoose.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=> {
        console.log("Connected to DB")
    }).catch(error => {
        console.error('Could not connect to the database. Exiting now...', error);
        //process.exit();
    })

module.exports.apptModel = mongoose.model("Appt", dbSchema.apptSchema);