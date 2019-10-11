const config = require('./config');
const mongoose = require('mongoose');
let mongoDB = `mongodb://${config.db.user}:${config.db.pwd}@${config.db.idDb}.mlab.com:${config.db.port}/${config.db.dbName}`;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db