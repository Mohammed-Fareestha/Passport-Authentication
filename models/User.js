const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        require: Date.now
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;