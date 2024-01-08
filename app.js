//importing modules
const express = require('express');
const path = require('path');
//routers
const matRouter = require('./Routing/Routing-material.js');
const customerRouter = require('./Routing/Routing-customers.js');
const orderRouter = require('./Routing/Routing-order.js');
const productionRouter = require('./Routing/Routing-production.js');
const productionFailRouter = require('./Routing/Routing-productionFails.js');
const scannerRouter = require('./Routing/Routing-scanner.js');
const loginRouter = require('./Routing/Routing-login.js');
//other moudles
const bodyParser = require('body-parser')
const session = require('express-session');
//const jwt = require('jsonwebtoken');

//use Express framework 
const app = express();

//use body parser
app.use(bodyParser.json()); 

//create Server
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started at http://localhost: ' + port);

/* //use authorization middleware
app.use((req, res, next) => {
    console.log('Heeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyyyyyyyyyy Time:', Date.now())
    // get token from authorization header
    const token = req.headers.authorization;

    //verfiy token
    jwt.verify(token, publicKey, function (err, decoded){
      if (err) {
        return res.status(403).json({message: 'Invalid token'});
      }
    })

    console.log("----------------------- autohoirzation successful -----------------------------");
    next()
  }) */
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


//use session middleware
app.use(session({
  secret: 'test123',
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: "lax",
            secure: false }
}));


//Routing to login
app.use('/login/', loginRouter);
app.use('/login/', express.static(path.join(__dirname, "public")));

//use authorization middleware
app.use((req, res, next) => {
  console.log("----------------------- autohoirzation check -----------------------------");
  
  //get session ID
  var permission = req.session.permission;

  if (permission) {
    console.log("user is authorized");
    next();
  }
  else if(req.method == 'OPTIONS') {
    next();
  }
  else {
    console.log("no authorization");
    res.redirect('/login/');
  }
}) 


app.use('/home/', express.static(path.join(__dirname, "public")));
app.get('/home/', async function(req, res) {
  res.sendFile(path.join(__dirname, "public", "Origin.html"));
})

//Routing for requests to material
app.use('/material/', matRouter);
console.log(path.join(__dirname, 'public'));
app.use('/material/', express.static(path.join(__dirname, "public")));
app.use('/material/changeMaterial', express.static(path.join(__dirname, "public")));

//Routing für request to customer
app.use('/customer/', customerRouter);
app.use('/customer/', express.static(path.join(__dirname, "public")));

//Routing for requests to orders
app.use('/order/', orderRouter);

//Routing for requests to production
app.use('/production/', productionRouter);
app.use('/production/', express.static(path.join(__dirname, "public")));

//Routing for requests to productionFails
app.use('/productionFails/', productionFailRouter);
app.use('/productionFails/', express.static(path.join(__dirname, "public")));

//Routing for requests to productionFails
app.use('/scanner/', scannerRouter);


