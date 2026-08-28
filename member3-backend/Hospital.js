const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: String,
    location: String,
    type: String,
    phone: String
});

module.exports = mongoose.model("Hospital", hospitalSchema);