const { Schema, model } = require("mongoose");

const YourSchema = new Schema({
    
}, {
    timestamps: true
});

module.exports = model('schema', YourSchema);
