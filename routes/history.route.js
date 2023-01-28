const express = require('express');
const { HistoryMiddlewarePost } = require('../middlewares/History.middleware');
const { UserHistoryMddel } = require("../model/User_History.mdoel");

const jwt = require("jsonwebtoken");
require('dotenv').config();
const HistoryRouter = express.Router();


HistoryRouter.get('/', async (req, res) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token == null) {
        res.status(401).send({msg:"Unauthorized"}); // Unauthorized
    }
    try {
        var decoded = jwt.verify(token, process.env.secretKey);
        if(decoded){
            let id = decoded.id;
            try {
                let data = await UserHistoryMddel.find({user_id:id});
                res.send(data);
            } catch (error) {
                res.send('Some error');
            }
        }
        else {
            res.send({msg:"Unauthorized"});
        }
      } catch(err) {
        res.status(401).send({msg:"Unauthorized"});
      }
})

HistoryRouter.post('/', HistoryMiddlewarePost,async (req, res) => {
    let body = req.body;
    // height in meters
    let height = (body.height)*0.304;
    let result = body.weight/(height*height);
    body.result = result;
    if (!body.weight || !body.height || !body.result || !body.user_id || body.weight === "" || body.height === "" || body.result === "" || body.user_id === "") {
        res.status(401).send({msg:"invalite details"});
    }else{
        let post = await UserHistoryMddel(body);
        post.save();
        res.send({msg:"success",result:result});
    }
})

module.exports = { HistoryRouter };