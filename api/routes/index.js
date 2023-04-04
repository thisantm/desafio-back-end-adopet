const bodyParser = require('body-parser');
const tutors = require('./tutorsRoute');
const shelters = require('./sheltersRoute');

module.exports = app => {
    app.use(bodyParser.json(),
            tutors,
            shelters)
}