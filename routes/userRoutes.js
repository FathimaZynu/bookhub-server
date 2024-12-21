let express = require('express')
let jwt = require('jsonwebtoken')


const { getUser, updateUser, createUser, getAllUsers, deleteUser, loginUser, sendMail, validateOtp } = require('../controllers/userControllers')
const tokenValidation = require('../middelwares/tokenValidation')
let router = express.Router()


router.get('/userDetails',tokenValidation, getUser)

router.get('/user', tokenValidation, getAllUsers)

router.put('/user/:id', updateUser)

router.delete('/user/:id', deleteUser)

router.post('/login', loginUser)

router.post('/email', sendMail)

router.post('/otp-login', validateOtp)

router.post("/", createUser)

module.exports = router