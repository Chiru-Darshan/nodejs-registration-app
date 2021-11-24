const express = require('express')
const {
    body,
    validationResult
} = require('express-validator/check')

const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.body)
    res.render('form', {
        title: "Registration Form"
    })
})
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
        res.send(' Thank you for registration!')
    } else {

    }
    console.log(req.body)
    res.render('form', {
        title: "Registration Form",
        errors: errors.array(),
        data: req.body
    })
})

module.exports = router;