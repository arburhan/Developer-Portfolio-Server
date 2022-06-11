require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
// mongodb user
const uri = `mongodb+srv://adminPortfolioAR:L1a3JKjIy55WYP6P@cluster0.wijkb.mongodb.net/?retryWrites=true&w=majority`;

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
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const project = await myProjectsCollection.findOne(filter);
            res.send(project);
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