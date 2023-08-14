const { model, Schema } = require('mongoose');


const UserModel = model('User', Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}))

module.exports = { UserModel };

let user = {
    "name": "aman",
    "email": "aman@gmail.com",
    "password": "1234"
}