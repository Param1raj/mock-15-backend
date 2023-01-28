
const jwt = require("jsonwebtoken");
require('dotenv').config();
const HistoryMiddlewarePost = (req, res, next) => {
    let body = req.body;
    let token = req.headers.authorization?.split(" ")[1];
    if (token == null) {
        res.status(401).send({msg:"Unauthorized"}); // Unauthorized
    }

    try {
        var decoded = jwt.verify(token, process.env.secretKey);
        if(decoded){
            body.user_id = decoded.id
            next();
        }
        else {
            res.send({msg:"Unauthorized"});
        }
      } catch(err) {
        res.status(401).send({msg:"Unauthorized"});
      }
      
}

const HistoryMiddlewareGet = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token == null) {
        res.status(401).send({msg:"Unauthorized"}); // Unauthorized
    }

    try {
        var decoded = jwt.verify(token, process.env.secretKey);
        if(decoded){
            next();
        }
        else {
            res.send({msg:"Unauthorized"});
        }
      } catch(err) {
        res.status(401).send({msg:"Unauthorized"});
      }
      
}

module.exports = { HistoryMiddlewarePost,HistoryMiddlewareGet };