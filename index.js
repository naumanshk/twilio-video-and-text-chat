const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const { chatToken } = require('./tokens');
var logger = require('morgan');
const cors = require('cors'); 
require('dotenv').config(); 

const app = express();

app.use(cors())
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};



app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  console.log(process.env.TWILIO_ACCOUNT_SID)
  sendTokenResponse(token, res);

});
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/token/:id', (req, res) => {
  console.log("request"+req)
  const id = req.params.id;
  console.log("query"+id)
  const room = req.query.room;
  console.log(config)
  const token = chatToken(id, 'naseem', config);
  sendTokenResponse(token, res);

})



app.listen(3002, () =>
  console.log('Express server is running on localhost:3001'+process.env.TWILIO_ACCOUNT_SID)
);
