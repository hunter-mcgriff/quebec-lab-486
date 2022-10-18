require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb')
const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 3000;
console.log(process.env.uri);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
  client.connect;
  client.db("myFirstDatabse").collection("posts").find().toArray().then(result => res.render('index' ,{ players : result  }));
  // const collection = client.db("myFirstDatabse").collection("posts");
  // const result = await collection.find().toArray();
  // console.log(result);
  // res.render('index' ,{ players : result    })
  })

app.post('/players', (req, res) => {
  client.connect;
  const collection = client.db("myFirstDatabse").collection("posts");
  collection.insertOne(req.body)
  .then(result => {
    res.redirect('/')
    })
  .catch(error => console.error(error))
})

app.post('/deletePlayers/:id', (req, res) => {
  console.log(req.params.id)
  client.connect;
  client.db("myFirstDatabse").collection("posts").findOneAndDelete({ _id: ObjectId( req.params.id) })
  .then(result => {res.redirect('/')})
  .catch(error => console.error(error))
})
    
app.listen(PORT, 
  () => console.log(`server is running on port: http://localhost:${ PORT }` ));
