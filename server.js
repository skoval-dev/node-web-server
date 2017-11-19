const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

//app.use((req, res, next) => {
  //  res.render('maintance.hbs');
//});

hbs.registerPartials(__dirname+'/views/partials/');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = {time: now, method: req.method, url: req.url};
    console.log(log);
    fs.appendFile('./log/server.log', JSON.stringify(log) + '\n', (err) => {
        if(err){
            console.log(err || data);
        }
    });
    next();
});

hbs.registerHelper('get_year', () => new Date().getFullYear());
hbs.registerHelper('scream_it', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    setTimeout(() => {
        res.render('index.hbs',{
                page_title: 'Home page',
                page_description: 'Welcome there!'
            });
    }, 0);
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       page_title: 'About page'
   });
});

app.get('/bad', (req, res) => {
    res.send({status: 404, message: 'The page wasn\'t found!'})
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});