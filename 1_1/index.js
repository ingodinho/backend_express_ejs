const express = require('express');
const navItems = require('./json.json');

const app = express();
const PORT = 9000;

app.set('view engine','ejs');

app.use((req,_,next) => {
  console.log('request incoming on: ', req.url, req.method);
  next();
})

app.use(express.static('public/css'));

navItems.forEach((el) => {
  app.get(el.url, ((_, res) => {
    res.render(el.url === '/' ? 'index' : el.url.slice(1), {navItems: navItems})
  })
)})

app.use((_,res) => {
  res.status(404).send('error - 404 site not found');
})

app.listen(PORT, () => console.log('server starts listening on port', PORT))