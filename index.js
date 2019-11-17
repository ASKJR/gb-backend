const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const cors       = require('cors')

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ 'gb-api': 'GB - teste pratico dev-backend' })
})

//routes
require('./src/routes/routes')(app);


//server
app.listen(3000, () => {
    console.log('Im running port 3000.');
});
