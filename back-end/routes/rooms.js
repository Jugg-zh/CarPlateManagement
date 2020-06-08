const router = require('express').Router();
let Room = require('../models/room.model');
const fs = require('fs')
const Desktop = require('path').join(require('os').homedir(), 'Desktop')

router.route('/').get((req, res) => {
    Room.find()
    .then(rooms => {
        res.json(rooms)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save/').get((req, res) => {
    Room.find()
    .then(rooms => {
        
        var data = [];
        for(i = 0; i < rooms.length; i++){
            var plateList = rooms[i]["plateList"].split(";");
            for(j = 0; j < plateList.length; j++){
                var d = new Object();
                d["roomNumber"] = rooms[i]["roomNumber"];
                d["plateNumber"] = plateList[j];
                data.push(d);
            }
        }
        var str = JSON.stringify(data,null, 2);
        console.log("Data downloaded")
        res.send(str);       
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').get((req, res) => {
    const roomNumber = req.body.roomNumber;
    const plateList = req.body.plateList;
    const newroom = new Room({roomNumber, plateList});
    
    newroom.save()
    .then(() => res.json('room added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addAllRooms').post((req, res) => {
    rows = req.body;
    for (i = 0; i < rows.length; i++) {
        
        roomNumber = rows[i]["roomNumber"];
        
        if(rows[i]["plateList"] == undefined) {
            plateList = "";
        }
        else{
            plateList = rows[i]["plateList"];
        }
        newroom = new Room({roomNumber, plateList});
        newroom.save()
        .then(() => res.json('room added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route('/:id').get((req, res) => {
Room.findById(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/update/:id').post((req, res) => {
    Room.findById(req.params.id)
        .then(room => {
        room.roomNumber = req.body.roomNumber;
        room.plateList = req.body.plateList;
        room.save()
            .then(() => res.json('room updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;