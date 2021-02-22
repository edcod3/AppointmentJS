const router = require("express").Router();
const mongoose = require('mongoose');
const db = require("../db");

// API Endpoints
router.get("/allapts", function(req, res){
    db.apptModel.find()
    .then((doc) => {
        res.json(doc);
    }).catch((err) => {
        console.log(err);
    }) 
})
router.post('/appts', function(req, res) {
    let appt_desc = req.body.description;
    let appt_urg = req.body.urgency;
    //Date-Format: YYYY-MM-DD
    let appt_dl = req.body.deadline;
    const appt = new db.apptModel({
        _id: new mongoose.Types.ObjectId(),
        description: appt_desc,
        deadline: appt_dl,
        urgency: appt_urg
    });
    appt.save()
    .then(doc => {
        if (appt === doc){
            let success = {
                success: true
            }
            res.json(success)
        } else {
            let success = {
                success: false
            }
            res.json(success)
        }
    })
    .catch(err => {
        res.status(400).json(err);
    })

})
router.post("/updateappt", function(req, res) {
    let findapptid = { _id: req.body._id};
    db.apptModel.findOneAndUpdate(findapptid, req.body, {new: true}, (err, doc) => {
        if (err) {res.status(400).json(err);}
        if (doc.description == req.body.description) {
            let updated = {
                updated: true
            }
            res.json(updated);
        } else {
            let updated = {
                updated: false
                }
            res.json(updated);
            }
        });

})
router.post("/deleteappt", function (req, res) {
    let remapptid = req.body;
    db.apptModel.findOneAndDelete(remapptid, (err) => {
        if (err) {res.status(400).json(err);}
        let deleted = {
            deleted: true,
            id: req.body._id
        }
        res.json(deleted)
    })
})

//Test API Endpoint

router.get("/test", function (req, res) {
    let jsontest= {test: "this is a test"};
    res.json(jsontest)
})


module.exports = router;