const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/arena', {
  useNewUrlParser: true
});

// Create a scheme for fighters in the arena: a name and a path to an image.
const fighterSchema = new mongoose.Schema({
  name: String,
  armor: Number,
  health: Number,
  attack: Number,
  speed: Number,
  creator: String,
  points: Number,
  path: String
});

const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a model for fighters in the arena.
const Fighter = mongoose.model('Fighter', fighterSchema);

// Get a list of all of the fighters in the arena.
app.get('/api/fighters', async (req, res) => {
  try {
    let fighters = await Fighter.find();
    res.send(fighters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new fighter in the arena: takes a name
app.post('/api/fighters', async (req, res) => {
    const fighter = new Fighter({
      name: req.body.name,
      armor: req.body.armor,
      path: req.body.path,
      health: 40,
      attack: req.body.attack,
      speed: req.body.speed,
      creator: req.body.creator
    });
    try {
      await fighter.save();
      res.send(fighter);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/fighters/:id', async (req, res) => {
  try {
    let fighter = await Fighter.findOne({
      _id: req.params.id
    });
    fighter.name = req.body.name;
    fighter.armor = req.body.armor;
    fighter.attack = req.body.attack;
    fighter.speed = req.body.speed;
    fighter.health = 40;
    fighter.creator = req.body.creator;
    fighter.path = req.body.path;
    await fighter.save();
    res.send(fighter);
  } catch(error) {
  console.log(error);
  res.sendStatus(500);
  }
});

app.delete('/api/fighters/:id', async (req, res) => {
  try {
    await Fighter.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(4210, () => console.log('Server listening on port 4210!'));