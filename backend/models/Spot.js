const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    coords: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    content: {
        imageURL: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        }
    }

})

module.exports = mongoose.model("Spot",SpotSchema);