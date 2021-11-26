const express = require('express');
const api = require('./api/api')
const app = express();

app.use(api);

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});