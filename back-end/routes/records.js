
const router = require('express').Router();
let Record = require('../models/record.model');
const fs = require('fs')
const Desktop = require('path').join(require('os').homedir(), 'Desktop')



router.route('/').get((req, res) => {
    Record.find()
    .then(records => res.json(records))
    .catch(err => res.status(400).json('Error: ' + err));
});

// find the record which its date is within two dates' range
router.route('/search').post((req, res) => {
    Record.find({
        timeStamp:{
            $gte : req.body.startDate,
            $lte : req.body.endDate
        }
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// download the queried documents to csv
router.route('/download').post((req,res) =>{
    Record.find({
        timeStamp:{
            $gte : req.body.startDate,
            $lte : req.body.endDate
        }
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const plateNumber = req.body.plateNumber;
    const roomNumber = req.body.roomNumber;
    const slotNumber = req.body.slotNumber;
    const timeStamp = Date.parse(req.body.timeStamp);
    const shift = req.body.shift;

    const newrecord = new Record({plateNumber,
                                roomNumber,
                                slotNumber,
                                timeStamp,
                                shift});

    newrecord.save()
    .then(() => res.json('record added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Record.findById(req.params.id)
      .then(record => res.json(record))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/upload').post((req,res) => {
    try{
        Record.insertMany(req.body)
        .then(() => res.json("added"))
        .catch(err => res.status(400).json('Error: ' + err));
        console.log("Data uploaded");
    }catch (e){
        console.log(e);
    }   
});

module.exports = router;