const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jokeSchema = new Schema({
    joke: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Joke = mongoose.model("Joke", jokeSchema)

module.exports = Joke
