const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express();

app.use(cors());

app.use(bodyParser.json());



const pass = process.env.DB_PASS;
const db = process.env.DB_USER;
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });





const user = ['asad', 'kalam', 'jabbar', 'rahim', 'karim', 'eyakub', 'shital'];


app.get('/', (req, res) => {
    const user = {
        name: 'shakil',
        home: 'bangladesh'
    }
    res.send(user);
})
app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.find().toArray((err, documents) => {
            if(err){
                console.log(err);
               res.status(500).send({message:err});
                
                
            }
            else{
                res.send(documents);
            }
            // console.log("succesfully inserted", result);
            // console.log('post request send');
            // console.log('data recived', req.body);
        })
        console.log("database connected");

        client.close();
    });
})




// app.get('/user/detail',(req,res) =>{
//     // const detail={user:'Italian',covid:'yes'};
//     res.send({user:'Italian',covid:'yes'});
// })

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const name = user[userId];
    console.log({ userId, name });
    console.log(req.query);

    res.send({ userId, name });

})


//post

app.post('/addProducts', (req, res) => {
    //save to database
    const product = req.body;
    product.id = 55;
    console.log(product);
    //databse connection
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err);
               res.status(500).send({message:err});
                
                
            }
            else{
                res.send(result.ops[0]);
            }
            // console.log("succesfully inserted", result);
            // console.log('post request send');
            // console.log('data recived', req.body);
        })
        console.log("database connected");

        client.close();
    });



})
const port =process.env.PORT || 4200
app.listen(port, () => console.log('Listening to port 4200'));