const express = require('express');
const { connection } = require('./config/db');
const {AuthRouter} = require('./routes/Auth.routes');
const {HistoryRouter} = require("./routes/history.route");


const app = express();
app.use(express.json());
app.use("/user",AuthRouter);
app.use("/result",HistoryRouter);


app.get("/",(req,res)=>{
    res.send("hellow");
})


app.listen(8080,async ()=>{
        try {
            await connection;
            console.log("Connected success fully")
        } catch (error) {
            console.log("Some error in connect")
        }
})