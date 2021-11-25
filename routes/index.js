const express = require('express')
const {
    body,
    validationResult
} = require('express-validator/check')

const router = express.Router()
const mongoose = require('mongoose')
const Registration = mongoose.model('Registration')
const path = require('path')


const auth = require('http-auth')
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
})



router.get('/', (req, res) => {
    console.log(req.body)
    res.render('form', {
        title: "Registration Form"
    })
})

router.get('/registrations', basic.check((req, res)=>{
    Registration.find()
    .then((registrations)=>{
        res.render('index', {title: 'Listing Registration', registrations})

    })
    .catch(()=> { res.send('Sorry! Something went wrong.'); })

    
}))


router.post('/', [
    body('name')
    .isLength({
        min: 1
    })
    .withMessage('Please enter a name'),
    body('email')
    .isLength({
        min: 1
    })
    .withMessage('Please enter email')

], (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        const registration = new Registration(req.body)
        registration.save()
       .then(() => { res.send('Thank you for your registration!'); })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
       
    } else {

        console.log(req.body)
    res.render('form', {
        title: "Registration Form",
        errors: errors.array(),
        data: req.body
    })
    }
    
})

module.exports = router;