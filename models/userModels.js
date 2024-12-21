let mongoose = require('mongoose')
 



let userSchema = mongoose.Schema({
    username : {
     type:String
    },
    email :{
     type:String,
     unique:true
    },
    password : {
     type :String
    },
    otp : {
        type :String
       },
    mobile : {
     type : String
    }
 })
 
 let UserModel = mongoose.model('user',userSchema) 

 module.exports = UserModel