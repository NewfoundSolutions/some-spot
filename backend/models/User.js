
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//generic user schema from previous app
const UserSchema = new Schema ({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
       type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',UserSchema);


