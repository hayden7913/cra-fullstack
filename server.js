const express = require('express');
const app = express();
const bp = require('body-parser');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());

const state = {
  position: [1,3]
};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/test', (req, res) => {
  console.log(state);
  res.send(state);
});

app.post('/test', (req, res) => {
  state.position = req.body.position;
  console.log(state);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});