const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function(req, res) {
    console.log("__dirname: " + __dirname);
    res.sendFile(path.join(__dirname, '/FormularMaterialAnlegen.html'));
});

module.exports = router;