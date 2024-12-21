let mongoose = require('mongoose');


function mongodbConnect(){
    mongoose.connect(`${process.env.MONGODB_URL}/Books`).then((res)=>{
        console.log('mongod connected');
        
    }).catch((err)=>{
        console.log(err);
        
    })
}
module.exports = mongodbConnect
