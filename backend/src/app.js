const express=require('express');
const app=express();
const cookieParser = require("cookie-parser");
const dotenv=require('dotenv').config();
const port=process.env.PORT ;
const connectDB=require('./config/db');
const apiRouter=require('./routes/index');

app.use(express.json());

app.use(cookieParser());
app.use('/api',apiRouter);
app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.listen(port, async()=>{
    await connectDB();
    console.log(`Server is running at http://localhost:${port}`);
});