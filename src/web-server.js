
const express         = require('express');
const bodyParser      = require('body-parser');
const cors = require('cors');

const path = require('path');
const app  = express();

const port              = process.env.PORT || 3000;
const web_port          = process.env.WEB_PORT || 8300;
const serveDirectory    = process.env.SERVE_DIR || '.';
const externalDirectory = process.env.EXTERNAL_DIR || '/external';

app.use(cors({
  origin: 'http://localhost:3000'  // Allow this origin to access the resources
}));

app.use(express.static(serveDirectory));

app.use('/external', express.static(externalDirectory));

app.use(bodyParser.json()); // For parsing application/json

const addEntryToField = (req, res) => {
  const { text } = req.body;
  if (text) {
    res.json({ result: text.toUpperCase() });
  } else {
    res.status(400).send('No text provided');
  }
}

app.post('/toupper', addEntryToField )

app.listen(web_port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving content from ./${serveDirectory}/`);
  console.log(`External content available from ${externalDirectory}`);
});

