// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 150,
      required: true,
    },
    bio: {
        type: String,
    }

});


module.exports = mongoose.model("profile", ProfileSchema);
