const mongoose = require('mongoose');

let connected = false;

async function connect(uri) {
  if (connected) return mongoose.connection;
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'adventuringghost' });
  connected = true;
  return mongoose.connection;
}

module.exports = { connect };


