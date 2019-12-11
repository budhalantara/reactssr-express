import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import color from './color';
import { StaticRouter } from 'react-router-dom';

const app = express();
let PORT = process.env.PORT || 3000;

let CONTENT = '';
const TEMPLATE = fs.readFileSync('./public/index.html','utf-8');
const CSS = `<link rel="stylesheet" href="static/main.css">`;
const SCRIPTS = `<script src="static/main.js"></script>`;

app.disable('x-powered-by');
app.use('/public', express.static('./public'));
app.use('/static', express.static('./client'));

const context = {};

app.get('/*', (req, res) => {

  const App = require('../src/App').default;

  CONTENT = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.send(
      TEMPLATE
      .replace(`<div id="root"></div>`, `<div id="root">${CONTENT}</div>`)
      .split(`%PUBLIC_URL%`).join(`public`)
      .replace(`</head>`, `${CSS}</head>`)
      .replace(`</body>`, `${SCRIPTS}</body>`)
    )
  }
});

app.listen(PORT, () => console.log(`${color.bgGreen(`   `).reset().bright(' Listening on port ').blue(PORT).cat()}`));