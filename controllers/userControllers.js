const UserModel = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let generateOTP = require('../utils/otpgenerator')

let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fathimazynu123@gmail.com',
        pass: 'konv imeu qzml fwyt'
    }
})


module.exports = {
    getUser: (req, res) => {
        let { id } = req.query
        console.log(req.query);
        UserModel.findOne({ _id: id }).then((result) => {
            console.log(result);
            res.status(200).json({ message: 'success', data: result })
        }).catch((err) => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    getAllUsers: async (req, res) => {
        try {
            let result = await UserModel.find({}, { password: 0 })
            console.log(result);
            res.status(200).json({ message: 'success', data: result })
        } catch (error) {
            console.log(error);
            res.status(401).json('failed ')
        }

    },

    sendMail: async (req, res, next) => {
        let otp = generateOTP(4)
        console.log(otp);
        
        let {email} = req.body
        console.log(req.bdoy);
        
        let mailOptions = {
            from: 'fathimazynu123@gmail.com',
            to: email,
            subject: 'OTP',
            text: otp
        }
        
        try {
            let result = await UserModel.updateOne({email},{otp})

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(info);
                res.status(200).json('OTP send successfully')
            })
        } catch (error) {
            console.log(error);
            
        }
        
        
       
    },

    validateOtp:async(req,res,next)=>{
        
        let {otp,email} = req.body

        try {
            let result = await UserModel.findOne({email})
            if(result.otp == otp){
                await UserModel.updateOne({email},{otp:''})
                res.status(200).json('login successfull')

            }else{
                res.status(400).json('login failed')
            }
        } catch (error) {
            
        }
    },


    updateUser: async (req, res) => {
        console.log(req.params.id);
        console.log(req.body);


        try {
            let { id } = req.params
            let { username, email, password, mobile } = req.body
            let result = await UserModel.updateOne({ _id: id }, {
                username, email, password, mobile
            })
            console.log(result);
            res.status(200).json({ message: 'updated successfully' })

        } catch (error) {
            console.log(error);
            res.status(401).json('failed updation')
        }
    },

    deleteUser: async (req, res) => {
        try {
            let { id } = req.params
            let result = await UserModel.deleteOne({ _id: id })
            console.log(result);
            res.status(200).json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log(error);
            res.status(401).json('failed')
        }

    },

    loginUser: async (req, res) => {
        let { email, password } = req.body
        try {
            let result = await UserModel.findOne({ email })
            if (!result) {
                return res.status(401).json('This email not exists')
            }
            bcrypt.compare(password, result.password, function (err, result) {
                if (result) {
                    jwt.sign({ result }, "123", (err, token) => {
                        console.log(token);
                        res.status(200).json({ message: 'Login successfull', token })
                    })

                } else {
                    res.status(401).json('Login failed')
                }
            });
        } catch (error) {
            res.status(401).json(error)
        }
    },

    createUser: async (req, res) => {
        console.log(req.body);
        
        let { username, email, password, mobile } = req.body
        try {
            let result = await UserModel.findOne({ email })
            if (result) {
                return res.status(401).json('This email already exists')
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                let student = new UserModel({
                    username,
                    email,
                    password: hash,
                    mobile
                })
                await student.save()
                res.status(201).json("hello");

            });


        } catch (error) {
            console.log(error);
            res.status(401).json(error)
        }

    }


}