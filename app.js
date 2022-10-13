require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(process.env.uri);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

let pName, pNumber, pPosition, players = '';

 app.get('/', (req, res) => {
        db.collection('quebec-numbers').find().toArray()
          .then(results => {
            res.render('index.ejs', { players: results})
          })
          .catch(error => console.error(error))
        // res.render('index.ejs', {})  
      })

      app.post('/players', (req, res) => {
        playersCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      // app.post('/players', (req,res) => {
      //     console.log(req.body);
      // })

    //   app.delete('/players/:id', (req,res)=>{
    //     const id=req.params.id;
    
    //     playersCollection.findOneAndDelete(id)
    //       .then(data=>{
    //         if(!data){
    //             res.status(404).send({message: "cannot work"})
    //         }else{
    //             res.send({
    //                 message:"User was deleted"
    //             })
    //         }
    //       })
    //       .catch(err=>{
    //         res.status(500).send({
    //             message:"cannot delete"
    //         });
    //       });
    // })

    app.post('/deletePlayer/:id', async (req,res)=>{
      
      console.log("id", req.params.id); 
      // console.log("name", req.sparams.name); 

      let result = await playersCollection.findOneAndDelete( 
        {
        // _id : `"ObjectId("${req.params.id}")"`
        // "_id": ObjectId("6340b4a0716efae98339f1d7")
        // "_id": "ObjectId(\"6340b4a0716efae98339f1d7\")"
        // "_id" : "ObjectId(6340b4a0716efae98339f1d7)"
        // _id : req.params.id
        // name :  req.params.name
        // "_id" :  `ObjectId('${req.params.id}')`
        // _id :  ObjectId('${req.params.id}')
        // "_id" : "6340ba72e3120ac27bd0ea9c"
        // "_id.$oid" : "6340ba72e3120ac27bd0ea9c"
        "_id": ObjectId(req.params.id)

        // name : "adfs"

       }
      )
      .then(result => {
        //res.json(`Deleted Darth Vader's quote`)
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
    })

    




app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));
