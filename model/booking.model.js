const { model, Schema, Types } = require('mongoose');
const {ObjectId}=Types;


const BookingModel = model('booking', Schema({
    user: { type: ObjectId, ref: 'User' },
    flight: { type: ObjectId, ref: 'Flight' }
}))

module.exports = { BookingModel };

let booking={
    "user":"",
    "flight":""
}