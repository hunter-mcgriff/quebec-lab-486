require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//mongodb+srv://hunter_mcgriff:<HGbaseball6!>@quebec.qjyhcwc.mongodb.net/?retryWrites=true&w=majority

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
    // res.sendFile(path.join(__dirname, "index.html" )); 
    // res.send('Hello ' + userName + ' from Node/Express/Heroku');

    client.connect(err => {
        const collection = client.db("myFirstDatabase").collection("posts");
        console.log('connected!');
        // perform actions on the collection object

    
        const result = await collection.find().toArray();
         console.log(result);
            
            res.send(result);
            // client.close();
        
    });

        // res.send(`Hello Express from inside my client connect f/n!`); 
});

    

    // res.render('index',  {     }    );


app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));
