import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!")

} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");
const usersCollection = db.collection("users");


app.post('/sign-up', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        res.sendStatus(400);
    } else {
        try {
            await usersCollection.insertOne(req.body)
            res.sendStatus(201)
           } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const comp = await usersCollection.findOne({email});
    res.send(comp)

});


app.listen(5000, () => {
    console.log('Tudo certo pra dar errado');
});