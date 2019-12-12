import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import color from './color';
import App from '../src/App';
import { StaticRouter } from 'react-router-dom';

const app = express();
const port = process.env.PORT || 5000;
const appPath = './dist/client';
const context = {};
let template = '';

if (fs.existsSync(`${appPath}/index.html`)){
  fs.renameSync(`${appPath}/index.html`, `${appPath}/template.html`)
}
if(fs.existsSync(`${appPath}/template.html`)) {
  template = fs.readFileSync(`${appPath}/template.html`,'utf-8')
}

app.disable('x-powered-by');
app.use('/', express.static(appPath))

app.get('/*', (req, res) => {
  const render = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

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
    )
  }
})

const server = app.listen(port, () => console.log(`${color.bgGreen(`   `).reset().bright(' Listening on port ').blue(port).cat()}`))

const shutdown = () => {
  console.log('Gracefully shutting down. Please wait...');
  if(fs.existsSync(`${appPath}/template.html`)) {
    fs.rename(`${appPath}/template.html`, `${appPath}/index.html`, (err) => {
      if(err) throw err
      server.close(() => {
        console.log(`${color.green('Process terminated').res()}`)
      }) 
    })
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGKILL', shutdown);

