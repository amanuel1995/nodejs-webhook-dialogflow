var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'QRG Webhook Simple Frontend' });
});

//  GET Userlist page. 
router.get('/userlist', function(req, res) {
    // get the db
    var db = req.db;

    // get the collection
    var collection = db.get('QRGs');

    // build the filter
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});


router.post("/userlist", function(req, res) {
    var db = req.db; // the db

    var collection = db.get('QRGs'); // the collection in the db

    // initialize variables
    var Manufacturer = "";
    var ProductNumber = "";
    var ApplicationType = "";
    var TerminalType = "";
    var Version = "";

    // set the variables
    if (req.body.result.parameters !== undefined) {
        Manufacturer = req.body.result.parameters.QRGManufacturer;
        TerminalType = req.body.result.parameters.QRGTerminalType;
        ApplicationType = req.body.result.parameters.QRGAppType;
        //TerminalType = rq.body.result.parameters.QRGTerminalType;
        //ProductNumber = req.body.result.parameters.QRGProductNumber;
        Version = req.body.result.parameters.QRGVersion;

    } else {
        console.log("The request body is empty.");
    }

    // build the filter  and excute count

    collection.find({ manufacturer: Manufacturer }, {}, function(e, docs) {

        // count cond.
        if (docs !== null) {
            docs = "yes, we have the QRG for " + Manufacturer + " " + TerminalType;
        } else {
            docs = "No. Sorry. Call customer reps."
        }

        // the JSON response
        return res.json({
            speech: docs,
            displayText: docs,
            source: "Aman's webhook - test"
        });
        //console.log(docs, "Userlist object");
    });

});

// db.close();

module.exports = router;