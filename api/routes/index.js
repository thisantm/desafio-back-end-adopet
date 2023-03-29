const bodyParser = require('body-parser');
const tutores = require('./tutoresRoute');

module.exports = app => {
    app.use(bodyParser.json(),
            tutores)
}