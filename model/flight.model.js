const { model, Schema } = require('mongoose');


const FlightModel = model('Flight', Schema({
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number
  }))

module.exports = { FlightModel };

let flight = {
    "airline": "bombay travels",
    "flightNo": "23",
    "departure": "1pm",
    "arrival": "2am",
    "departureTime": "2023-08-14T11:55:01.590Z",
    "arrivalTime": "2023-08-16T11:55:01.590Z",
    "seats": 330,
    "price": 3000
  }