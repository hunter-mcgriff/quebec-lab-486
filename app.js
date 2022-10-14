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

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("myFirstDatabase").collection("posts");
    const result = await collection.find().toArray();
      
    // console.log("cxnDB result: ", result);
    return result; 

  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }


}

app.get('/', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  // console.log("get/: ", result);

  res.render('index', { 
    players : result
  })
})



     
app.post('/players', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("myFirstDatabase").collection("posts");
    await collection.insertOne(req.body);
      
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})

    
          
});
    




app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));
