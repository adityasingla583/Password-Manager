const express = require('express')
const app = express()
// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb');
const port = 5000
const bodyparser=require('body-parser')
const cors=require('cors')
// import dotenv
const dotenv=require('dotenv')
dotenv.config();


// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop'
app.use(bodyparser.json())
app.use(cors())
client.connect();

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.json({success:true})
})

app.delete('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.json({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})
