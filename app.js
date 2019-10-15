const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// USER
const user = require('./routes/user.route');
app.use('/user', user);

// Set up mongoose connection
const db = require('./mlab');

app.listen(process.env.PORT || config.port, () => {
    console.log('Server is up and running on port numner ' + config.port);
});