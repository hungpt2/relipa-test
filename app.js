const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
var cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// initialize our express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CURRENCY
const currency = require('./routes/currency.route');
app.use('/v1/currency', currency);

// USER
const user = require('./routes/user.route');
app.use('/v1', user);

// STORE
const store = require('./routes/store.route');
app.use('/v1/store', store);

// PRODUCT
const product = require('./routes/product.route');
app.use('/v1/product', product);

// Set up mongoose connection
const db = require('./mlab');

app.disable('etag');

app.listen(process.env.PORT || config.port, (err) => {
    if (err) throw err
    console.log('Server is up and running on port: ' + config.port);
});