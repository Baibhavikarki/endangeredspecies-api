var express = require("express");
const cors = require('cors');

var app = express();
app.use(cors({ origin: 'https://endangered-species-api.herokuapp.com' }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var HTTP_PORT = process.env.PORT || 8080;

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://OpenAI:2RpW2oM2lVdPFyHq@cluster0.fyqnoa9.mongodb.net/endangered_species';
 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
async function connect() {
  try {
    await client.connect();
    console.log('Connected to the database');
    db = client.db('endangered_species');
  } catch (err) {
    console.log('Error connecting to the database', err);
  }
}

connect();


app.listen(HTTP_PORT, onHttpStart);


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/individuals", async (req,res) => {
  try {
 
    const result = await db.collection('individuals').find().toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});

app.get("/species", async (req,res) => {
  try {
 
    const result = await db.collection('species').find().toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});
app.get("/species/:speciesId", async (req,res) => {
  try {
    const speciesID = parseInt(req.params.speciesId);
    const result = await db.collection('individuals').find({species_id: speciesID}).toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});


app.get("/sightings/:animalId", async (req,res) => {
  try {
    const animalId = parseInt(req.params.animalId);
    const result = await db.collection('sightings').find({animal_id: animalId}).toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});
