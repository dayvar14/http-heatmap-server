const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String
    },
    name:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now,
        index: {expires: 60} 
    }
});

module.exports = mongoose.model("user", UserSchema);