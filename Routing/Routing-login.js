const express = require('express');
//integrate path module
const path = require('path');

const DBConnection = require('../DataBaseConnection');
const LoginDatabase = require('../DB/Login-database');

var loginRouter = express.Router();

//Method to check authorization
loginRouter.post('/', async function(req, res) {
    //get infos from request
    const userInfo = req.body;

    //create database connectionObject
    const dbConnection = new DBConnection();
    const loginDatabase = new LoginDatabase(dbConnection);

    //check if user exists
    const check = await loginDatabase.checkUser(userInfo);

    if (check){
        req.session.permission = true;
        res.send(true);
    }
    else {
        req.session.permission = false;
        res.send(false);
    }
})


//load html page for login
loginRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "Login.html"));
})

module.exports = loginRouter;