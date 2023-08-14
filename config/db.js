const { connect } = require('mongoose');
require('dotenv').config();

const connection = connect(`${process.env.dburl}`);

module.exports = { connection };