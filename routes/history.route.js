const express = require('express');

const HistoryRouter = express.Router();


HistoryRouter.get('/',(req,res)=>{
    res.send("Hellow");
})


module.exports = {HistoryRouter};