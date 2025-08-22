const express = require('express'); //import express
const bodyParser = require('body-parser'); //import body-parser

const viewEngine = require('./config/viewEngine.js');
const initWebRoutes = require('./routes/web.js') ;
const connectDB = require('./config/configDB.js');
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});