let tokenValidation = (req, res, next) => {
    console.log(req.headers.authorization);
     
    if(!req.headers.authorization){
        res.status(401).json('no token')
        return;
    }

    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, '123', (err, payload) => {
        if (err) {
            res.status(401).json('inavalid token')
        } else {
            next()
        }
    })

}

module.exports = tokenValidation