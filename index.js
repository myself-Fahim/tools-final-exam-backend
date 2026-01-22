const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = 4000
app.use(express.json())
app.use(cors())




const uri = "mongodb+srv://tools-final-app:Kj5ulk9e32IhIuqT@cluster0.konzx.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const database = client.db('tools-exam')
    const taskCollection = database.collection('tasks');
    const taskCollectiondone = database.collection('');
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     app.post('/task', async (req,res) =>{
      const data = req.body;
      const result = await taskCollection.insertOne(data)
      res.send(result)
    })

    app.get('/task',async(req,res)=>{
      const data = await taskCollection.find().toArray()
      res.send(data)
    })
    // Send a ping to confirm a successful connection

 
       
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log(`Server Running from port:${port}`);

})