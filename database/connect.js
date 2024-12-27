const mongoose = require('mongoose');

module.exports = async () => {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
        dbName: process.env.MONGO_DB_NAME
    });
}