
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

app.use(cors());
app.use(express.json())
app.options("*", cors());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: true}))

// // parse requests of content-type - application/json
// app.use(bodyParser.json())
//app.use(express.json())


// Configuring the database
const dbConfig = require('./App/Config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
    // console.log(mongoose.connection.db.collections.)
    // mongoose.connection.db.listCollections().toArray((err, collections) => {
    //   console.log(collections);
    // })
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Call Button NFC"});
});

// ........

// Require Patient Request routes
const patient_requests = require('./App/routes/patientrrequest.routes.js')
const providers = require('./App/routes/providers.routes.js')
// require('./App/routes/patientrrequest.routes.js')(app);
// require('./App/routes/providers.routes.js')(app);

app.use('/patient-requests', patient_requests)
app.use('/providers', providers)
// ........

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});