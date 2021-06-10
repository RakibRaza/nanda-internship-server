const express = require('express')
const app = express()
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xk6a4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

client.connect(err => {
  const movieCollection = client.db(process.env.DB_NAME).collection("movies");

  app.post("/add-movie", (req, res) => {
    const movie = req.body;
    movieCollection.insertOne(movie).then((result) => res.send(result.insertedCount > 0));
  });

});



let port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running at port ${port}`))