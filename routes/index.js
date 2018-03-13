var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//  GET Userlist page. 
router.get('/userlist', function(req, res) {
    var db = req.db;
    console.log(db, "The db object");
    var collection = db.get('usercollection');

    console.log(collection, "The collections cursor");

    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
        console.log(docs, "Userlist object");
    });
});

module.exports = router;