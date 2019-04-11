require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routes')

const port = process.env.PORT || 3000

let app = express()

mongoose.connect('mongodb://localhost/classic_fox_live_code_1', {useNewUrlParser: true});

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', route)

app.listen(port, ()=>{
    console.log(`Listen on ${port}`);
})
