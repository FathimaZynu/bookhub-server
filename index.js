let express = require('express');
const mongodbConnect = require('./configure/configure');
let app = express();
let dotenv = require('dotenv')
dotenv.config()


mongodbConnect()

app.use(express.json())

const cors = require('cors');
app.use(cors());


let userRoutes = require('./routes/userRoutes')
let bookRoutes = require('./routes/bookRoutes')
app.use('/',userRoutes)
app.use('/books',bookRoutes)





app.listen(3000,()=>{
    console.log('server connected');
    
})

// konv imeu qzml fwyt