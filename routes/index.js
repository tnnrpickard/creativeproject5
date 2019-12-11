var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

router.get('/getfight',async function(req,res,next) {
    var hero = req.query.hero;
    var villian = req.query.villian;
    var heroRand = (Math.random() + .8);
    var villianRand = (Math.random() + .8);
    var villiandmg = hero.attack*heroRand - villian.armor*villianRand;
    var herodmg = villian.attack*villianRand - hero.armor*heroRand;
    var fightInfo = {villiandmg:villiandmg, herodmg:herodmg};
    res.status(200).json(fightInfo);
});

module.exports = router;
