import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import color from './color';
import App from '../src/App';
import { StaticRouter } from 'react-router-dom';

const app = express();
const port = process.env.PORT || 3000;
const css = `<link rel="stylesheet" href="static/main.css">`;
const scripts = `<script src="static/main.js"></script>`;
const context = {};
let template = '';

if(fs.existsSync('./public/index.html')) {
  template = fs.readFileSync('./public/index.html','utf-8')
}

app.disable('x-powered-by');
app.use('/public', express.static('./public'));
app.use('/static', express.static('./client'));

app.get('/*', (req, res) => {

  const render = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if(!template) {
    return res.status(500).send('Template not found!');
  }
  
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(
      template
      .replace(`<div id="root"></div>`, `<div id="root">${render}</div>`)
      .split(`%PUBLIC_URL%`).join(`public`)
      .replace(`</head>`, `${css}</head>`)
      .replace(`</body>`, `${scripts}</body>`)
    )
  }
});

app.listen(port, () => console.log(`${color.bgGreen(`   `).reset().bright(' Listening on port ').blue(port).cat()}`));