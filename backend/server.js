import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectdb from './config/mongodb.js';
import connectcloud from './config/cloudinary.js';
import userroutes from'./routes/userroutes.js';
import productrouter from './routes/productroutes.js';
const app=express();
const port=5000;
connectdb();
connectcloud();
app.use(express.json());
app.use(cors());

app.use('/api/users/',userroutes);
app.use('/api/products/',productrouter);


app.listen(port,()=>console.log("server is running on port 5000"));
