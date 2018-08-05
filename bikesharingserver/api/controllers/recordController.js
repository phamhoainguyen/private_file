
'use strict'

let mongoose = require('mongoose');
let Record = require('../models/recordModel');
let User = require('../models/userModel');

exports.createRecord = function (req, res) {
    console.log("da toi ham createRecord");
    let newRecord = new Record(req.body);
    
    newRecord.userID = req.currentUser.userID;

    let d = new Date(req.body.startTime);
    d.setHours(d.getHours() + 7);
    newRecord.startTime = d;

    newRecord.user_id = req.currentUser._id
    console.log(newRecord.user_id);

    newRecord.save((err, record) => {
        if (record)
            res.status(200).json(record.recordID);
        else {
            res.status(401).json(err);
        }
    });
};

exports.getAllRecord = function (req, res) {

    let startLat = parseFloat(req.query.lat);
    let startLong = parseFloat(req.query.long);
    let radius = parseFloat(req.query.radius);

    var query = Record.find({ 'isDelete': 0, 
        'startLocation.coordinates': {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [startLong, startLat]
                },
                $maxDistance: radius
            }
        },
    }, 
    'recordID userID user_id vehicle vehicleName price startLocation endLocation startAddress endAddress startTime endTime distance timeDuration');

    var uID = req.currentUser.userID;
    let y = parseInt(req.query.year);
    let m = parseInt(req.query.month) - 1;
    let d = parseInt(req.query.date);

    let h = parseInt(req.query.hour);
    let p = parseInt(req.query.minute) - 30;


    var date = new Date(y, m, d, h, p, 0, 0);
    date.setHours(date.getHours() + 7);
    console.log(date);
    query.where('startTime').gte(date);
    query.where("userID").ne(uID);
    query.where("vehicle").equals(req.query.vehicle);
    query.populate({path: 'user_id', select: 'userID name phoneNumber gender city birthYear profileImg '});
    query.exec((err, records) => {
        if (records) {
            res.status(200).json(records);
        }
        else {
            res.status(401).json(err);
        }
    });
}



// dung callback function
exports.getRecordByID = function (req, res) {
    Record.findOne({ 'recordID': req.params.id, 'isDelete': 0 }, 'recordID userID user_id vehicle vehicleName price startLocation endLocation startAddress endAddress startTime endTime distance timeDuration')
    .populate({path: 'user_id', select: 'userID name phoneNumber gender city birthYear profileImg '})
    .exec((err, record) => {
        if(record) {
            res.status(200).json(record);
        }
        else {
            res.status(401).json(err);
        }
    });
    
}


exports.updateRecord = function (req, res) {
    Record.findOneAndUpdate({ recordID: req.params.id }, req.body, { new: true }, (err, record) => {
        if (record) {
            res.status(200).json(record.recordID);

        }
        else {
            res.status(401).json(err);
        }
    });
};

exports.deleteRecord = function (req, res) {
    Record.findOneAndUpdate({ recordID: req.params.id }, { $set: { "isDelete": 1 } }, { new: true }, (err, record) => {
        if (record) {
            return res.status(200).json(record.recordID);

        }
        else {
            res.status(401).json(err);
        }
    })
}


//get all record of user

exports.getAllRecordByUserId = (req, res) => {
    Record.find({ 'isDelete': 0, 'userID': req.currentUser.userID }, 'recordID userID user_id vehicle vehicleName price startLocation endLocation startAddress endAddress startTime endTime distance timeDuration')
    .exec((err, records) => {
        if(records) {
            return res.status(200).json(records);
        }
        else {
            return res.status(401).json(err);
        }
    })
}