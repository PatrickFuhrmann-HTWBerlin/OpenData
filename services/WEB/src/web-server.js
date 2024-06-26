
const express         = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser      = require('body-parser');
const path            = require('path');


const app  = express();

const host              = process.env.OD_API_SERVER_HOST || 'api-server';
const port              = process.env.OD_API_SERVER_PORT || 3000;

const web_port          = process.env.OD_WEB_SERVER_PORT || 8300;

const serveDirectory    = process.env.OD_WEB_SERVER_DIR || '.';
const externalDirectory = process.env.EXTERNAL_DIR      || '/external';

app.use(express.static(serveDirectory));
app.use('/external', express.static(externalDirectory));

// Proxy configuration
ourTarget = 'http://'+host+':'+port 

const details = {
  target: ourTarget ,  // Target host
  router: '' ,
  changeOrigin: true,           // Needed for virtual hosted sites
  pathRewrite: {
      '^/forward': '',            // Rewrite the URL path (remove the /relay part)
  }
}
console.log(JSON.stringify(details)) ;

//const apiProxy = createProxyMiddleware( '/forward/' , details );
const apiProxy = createProxyMiddleware( details );

// Use the proxy middleware
app.use('/forward', apiProxy);

app.use(bodyParser.json()); // For parsing application/json

app.listen(web_port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving content from ./${serveDirectory}/`);
  console.log(`External content available from ${externalDirectory}`);
  console.log('Connecting to API Server : http://${host}:${port}');
});

