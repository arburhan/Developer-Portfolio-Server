const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
// mongodb user
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wijkb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// try to solve problem
async function run() {
    try {
        await client.connect();
        // collections
        const myProjectsCollection = client.db("Portfolio-Data").collection("projects");

        // projects
        app.get('/projects', async (req, res) => {
            const projects = await myProjectsCollection.find().toArray();
            res.send(projects);

        })
    }
    finally {

    }
}
run();

app.get('/', (req, res) => {
    res.send('Hello Portfolio!')
})

app.listen(port, () => {
    console.log(`Portfolio listening on port ${port}`)
})