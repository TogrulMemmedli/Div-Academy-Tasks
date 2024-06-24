const logSystem = (req, res, next) => {
    console.log(new Date(), req.method, req.url)
    if (req.body){
        console.log(req.body)
    }
    next();
}

module.exports = logSystem;