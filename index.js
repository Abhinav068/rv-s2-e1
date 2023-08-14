const express=require('express');
const cors=require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./routers/user.router');
const { flightRouter } = require('./routers/flight.router');
const { bookingRouter } = require('./routers/booking.router');

require('dotenv').config();

const app=express();
const port=process.env.port;

app.use(express.json());
app.use(cors());
app.use('/api',userRouter);
app.use('/api',flightRouter);
app.use('/api',bookingRouter);

app.get('/',(req,res)=>{
    res.send('running');
})

app.listen(port,async ()=>{
    await connection;
    console.log(`Server is running at http://localhost:${port}`);
})

