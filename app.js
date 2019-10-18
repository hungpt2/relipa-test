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
// USER
const user = require('./routes/user.route');
app.use('/v1', user);

// Set up mongoose connection
const db = require('./mlab');

app.listen(process.env.PORT || config.port, (err) => {
    if (err) throw err
    console.log('Server is up and running on port: ' + config.port);
});