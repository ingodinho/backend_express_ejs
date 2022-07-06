const express = require('express');
const {navItems} = require('./data/navItems');

const app = express();
const PORT = 9000;

const renderPage = (url,filePath) => {
  app.get(url, ((_, res) => {
    res.render(filePath, {navItems: navItems});
  }))
}

app.set('view engine', 'ejs')

app.use((req,_,next) => {
  console.log('new request incoming', req.method, req.url);
  next();
})

app.use(express.static(__dirname + '/public'));

renderPage('/', 'index');
renderPage('/about', 'about');
renderPage('/works', 'works');
renderPage('/gallery', 'gallery');

app.use((_,res)=> {
  res.status(404).send('Sorry, Page not found!');
})

app.listen(PORT, ()=> console.log('server starts listening on port: ', PORT));