var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

router.get('/getfight',async function(req,res,next) {
    var hero = req.query.hero;
    var villian = req.query.villian;
    var heroRandom = (Math.random() + .75);
    var villianRandom = (Math.random() + .75);
    var intervalInfo = {note1:note1, note2:note2, interval:interval};
    res.status(200).json(intervalInfo);
});

module.exports = router;
