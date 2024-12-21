const bookModel = require('../models/bookModels')
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;

module.exports = {
    getBooks: async (req, res) => {
        try {
            let result = await bookModel.find({})
            console.log(result);
            res.status(200).json({ message: 'success', data: result })
        } catch (error) {
            console.log(error)
            res.status(401).json('Failed to load books')
        }

    },

    getBook: (req, res) => {
        let { id } = req.query
        console.log(req.query);
        bookModel.findOne({ _id: id }).then((result) => {
            console.log(result);
            res.status(200).json({ message: 'success', data: result })
        }).catch((err) => {
            console.log(err);
            res.status(400).json(err)
        })

    },

    postBook: (req, res) => {

        let {title,author,description} = req.body
        console.log(req.body);
        console.log(req.file);

        
        (async function () {

            // Configuration
            cloudinary.config({
                cloud_name: 'dchwqnfi4',
                api_key: '592915157775781',
                api_secret: 'XcefxIaELxuSANENQkuKxx2j5q4' // Click 'View API Keys' above to copy your API secret
            });

            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path, {
                    public_id: req.file.originalname,
                }
                )
                .catch((error) => {
                    console.log(error);
                });

            console.log(uploadResult);

            // Optimize delivery by resizing and applying auto-format and auto-quality
            const optimizeUrl = cloudinary.url(req.file.originalname, {
                fetch_format: 'auto',
                quality: 'auto'
            });

            console.log(optimizeUrl);

            // Transform the image: auto-crop to square aspect_ratio
            const autoCropUrl = cloudinary.url(req.file.originalname, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
            });

            console.log(autoCropUrl);

            bookModel.create({
                title ,
                author ,
                description ,
                imageUrl:uploadResult.url
            }).then((result) => {
                console.log(result);
                res.json('Data inserted successfully')
    
            }).catch((err) => {
                console.log(err);
                res.status(401).json('creation failed')
    
            })
        })();
    
        
    },

    updateBook: (req, res) => {
        let { title, author, description } = req.body
        let updateFields = {}
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (author) updateFields.author = author;
        console.log(updateFields);

        let { id } = req.params
        bookModel.updateOne({ _id: id }, {
            $set: updateFields
        }).then((result) => {
            console.log(result);
            res.json("Book datas updated successfully")
        }).catch((err) => {
            console.log(err);
            res.status(401).json("Book updation failed")
        })

    },

    deleteBook: (req, res) => {
        console.log(req.params);
        let { id } = req.params
        bookModel.deleteOne({ _id: id }).then((result) => {
            console.log(result);
            res.status(200).json('Data deleted successfully')
        }).catch((err) => {
            console.log(err);
            res.status(401).json('Deletion failed')

        })

    }
}