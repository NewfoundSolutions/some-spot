
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid');

//generic user schema from previous app
const UserSchema = new Schema ({
    _id: {
        type: String,
        default: ()=>{uuidv4()},
        unique: true,
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


