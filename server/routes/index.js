const router = require('express').Router()
const User = require('../models/user')
const Joke = require('../models/joke')
const {hash, compare} = require('../helpers/bcrypt')
const {sign, verify} = require('../helpers/jwt')
const axios = require('axios')

router.post('/register', (req, res)=>{
    let newUser = {
        email: req.body.email,
        password: hash(req.body.password)
    }
    User.create(newUser)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.post('/login', (req, res)=>{
    console.log("MASUK1");
    
    User.findOne({email:req.body.email})
    .then(userFound=>{
        if(compare(req.body.password, userFound.password)){
            let payload = {
                id: userFound._id,
                email: userFound.email
            }
            let jwt = sign(payload)
            res.json({'token':jwt})
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/joke', (req, res)=>{
    // { headers: {'Accept':'application/json'}}
    axios({
        method: 'get',
        url: 'https://icanhazdadjoke.com/',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(({data})=>{

        res.status(200).json(data.joke)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.post('/favorites', (req, res)=>{
    // { headers: {'Accept':'application/json'}}
    let decode = verify(req.headers.token)

    console.log(decode,"<<<<<<<<<<<<<<<<<<<<<<DECODE JWT");
    
    let newFav = {
        joke: req.body.joke,
        userId: decode.id
    }
    Joke.create(newFav)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.get('/favJoke', (req, res)=>{
    // { headers: {'Accept':'application/json'}}
    let decode = verify(req.headers.token)
    Joke.find({ userId:decode.id })
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

module.exports = router