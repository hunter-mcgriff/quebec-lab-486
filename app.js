require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express()
let posts = ''; 

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', 'ejs');

//https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/?_ga=2.139188021.787505761.1665005296-318603171.1665005296
async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        databasesList = await client.db().admin().listDatabases();
 
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

        posts = await client.db("myFirstDatabase").collection("posts").findOne();

        console.log(posts); 
        
        return posts; 
        // return posts.findOne();


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// main().catch(console.error);


app.get('/', async function (req, res) {
    // res.sendFile(path.join(__dirname, "index.html" )); 
    // res.send('Hello ' + userName + ' from Node/Express/Heroku');

    const result = await main().catch(console.error);

    console.log("results: ", result.title); 

   res.send(`results:  ${ result.title }`); 
// res.send("farts"); 
    });

app.listen(PORT, console.log(`server is running on port: ${PORT}` ));
