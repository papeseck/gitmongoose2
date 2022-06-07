const mongoose = require("mongoose");
let Schema = mongoose.Schema

// create schema
var personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

