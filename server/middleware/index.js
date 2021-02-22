module.exports = {
    corsHandler: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
    }
}