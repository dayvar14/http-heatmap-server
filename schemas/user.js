const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", UserSchema);