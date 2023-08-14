const { Router } = require('express');
const { FlightModel } = require('../model/flight.model');

const flightRouter = Router();

flightRouter.get('/flights', async (req, res) => {
    try {
        const allFlights = await FlightModel.find();
        res.status(200).send({ allFlights });
    } catch (error) {
        console.log(error);
    }
})

flightRouter.get('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const flight = await FlightModel.findById(id);
        res.status(200).send({ flight });
    } catch (error) {
        console.log(error);
    }
})


flightRouter.post('/flights', async (req, res) => {
    try {
        const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price} = req.body;
        const flight = new FlightModel({ airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price});
        await flight.save();
        res.status(201).send({ res:'fligh data saved successfully' });
    } catch (error) {
        console.log(error);
    }
})

flightRouter.put('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await FlightModel.findByIdAndUpdate(id, {...req.body});
        res.status(204).send({ res:'Flight data updated.' });
    } catch (error) {
        console.log(error);
    }
})

flightRouter.delete('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await FlightModel.findByIdAndDelete(id);
        console.log(flight);
        res.status(202).send({ res:'Flight data deleted.'});
    } catch (error) {
        console.log(error);
    }
})

module.exports = { flightRouter };



