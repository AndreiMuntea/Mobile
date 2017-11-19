const Koa = require('koa')
const movies = require('./movies.js');

var app = new Koa();

app.use(movies.routes());
app.listen(3000);