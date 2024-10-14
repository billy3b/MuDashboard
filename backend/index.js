const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const over = require("./models/overview")
const overRoute = require("./routes/overview")
const uri = "mongodb+srv://mayankmusigma:7wIZZE5g4iSrGwz2@cluster0.zb31n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const cors = require('cors');
const port = 2000;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use('/', overRoute);

  app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
    })
)

mongoose.connect("mongodb+srv://mayankmusigma:7wIZZE5g4iSrGwz2@cluster0.zb31n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("Item Database connected"))
.catch(err => console.log(err));


// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);


app.listen(port, function () {
    console.log("Backend running on port 2000")
});
