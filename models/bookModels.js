let mongoose = require('mongoose')
 



let bookSchema = mongoose.Schema({
    title : {
     type:String
    },
    author :{
     type:String,
    },
    description : {
     type :String
    },
    imageUrl :{
        type:String
    }
 })
 
 let bookModel = mongoose.model('bookDetails',bookSchema) 

 module.exports = bookModel