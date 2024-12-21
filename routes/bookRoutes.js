let express = require('express')
let app = express();

let jwt = require('jsonwebtoken')

let multer = require('multer')

const storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const tokenValidation = require('../middelwares/tokenValidation');
const { deleteBook, getBook, getBooks, updateBook, postBook } = require('../controllers/bookControllers');
let router = express.Router()

router.get('/all',  getBooks)

router.get('/', getBook)

router.put('/update/:id', updateBook)

router.delete('/delete/:id', deleteBook)

router.post("/",upload.single('image'), postBook)

module.exports = router
