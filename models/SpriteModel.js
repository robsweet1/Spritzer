const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SpriteSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    frames: [{
        id: String,
        array: []
    }],
    email: {
        type: String,
        required: true,
    }
})

const SpriteModel = mongoose.model('sprite', SpriteSchema)

module.exports = SpriteModel