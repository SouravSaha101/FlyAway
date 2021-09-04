const express = require('express');
const app = express();

app.get('/', function (req, res) {
 return res.send('Hello world');
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`App listening on port ${process.env.PORT || 5000}!`),
);