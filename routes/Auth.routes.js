const express = require('express');
const { UserAuthModel } = require('../model/Auth.model');
const bcrypt = require('bcrypt');
const AuthRouter = express.Router();
const jwt  = require("jsonwebtoken");
require('dotenv').config();

AuthRouter.get('/', (req, res) => {
    res.send("Hellow");
})


AuthRouter.post('/register', async (req, res) => {
    let body = req.body;
    if (body.email === "" || body.name === "" || body.password === "") {
        res.send({ msg: "Wrong credentials" });
    }
    else {
        let user = await UserAuthModel.find({ email: body.email })
        if(user.length !== 0){
            res.status(400).send({msg:"already exist try login"});
        }else {
            bcrypt.hash(body.password, 5, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    throw err
                }
                body.password = hash
                try {
                    let user = await UserAuthModel(body);
                    user.save();
                    res.send("Succcess");
                } catch (error) {
                    res.send({ msg: "Some internal error" })
                    console.log(err)
                }
            });
        }

    }
})

AuthRouter.post("/login", async (req, res) => {
    let body = req.body;
    if (body.email === "" || !body.email || body.name === "" || !body.name || body.password === "" || !body.name) {
        res.send({ msg: "Wrong credentials" });
    } else {
        let user = await UserAuthModel.find({ email: body.email })
        if(user.length !== 0){
            let password = user[0].password;
            // console.log(password);
            bcrypt.compare(`${body.password}`, `${password}`, function(err, result) {
                // result == true
                if(err){
                    throw err;
                }
                if(result){
                    console.log(user[0]._id);
                    const token = jwt.sign({id:`${user[0]._id}`}, process.env.secretKey);
                    // console.log(token);
                    res.status(200).send({msg:"Successfully login",token:token});
                }else{
                    res.status(401).send({msg:"Wrong crendentials"});
                }
            });
        }else {
            res.status(404).send({msg:"not found!"})
        }
        // res.send("Success");
    }
})


module.exports = { AuthRouter };