const { Router } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { BookingModel } = require('../model/booking.model');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const bookingRouter = Router();

bookingRouter.post('/booking', async (req, res) => {
    try {
        const { user, flight } = req.body;
        const booking = new BookingModel({ user, flight });
        await booking.save();

        res.status(201).send({ res: 'Booking successful' })
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.get('/dashboard', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.tokenkey);
        if (decoded) {
            const userid = decoded.user._id

            const allbookings = await BookingModel.aggregate([
                {
                    '$match': {
                        'user': new ObjectId(userid)
                    }
                }, {
                    '$lookup': {
                        'from': 'flights',
                        'localField': 'flight',
                        'foreignField': '_id',
                        'as': 'result'
                    }
                }, {
                    '$project': {
                        'flight': 0
                    }
                }, {
                    '$unwind': {
                        'path': '$result'
                    }
                }, {
                    '$project': {
                        'flight': '$result',
                        'user': 1
                    }
                }
            ])
            res.status(200).send({ allbookings });
        }
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.put('/dashboard/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await BookingModel.findByIdAndUpdate(id, { ...req.body });
        res.status(204).send({ res: 'Booking updated.' });
    } catch (error) {
        console.log(error);
    }
})

bookingRouter.delete('/dashboard/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await BookingModel.findByIdAndDelete(id);

        res.status(202).send({ res: 'Booking deleted.' });
    } catch (error) {
        console.log(error);
    }
})
module.exports = { bookingRouter };