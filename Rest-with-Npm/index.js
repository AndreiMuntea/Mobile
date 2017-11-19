var Koa = require('koa');
var Router = require('koa-router');
var Bodyparser = require('koa-bodyparser');

var app = new Koa();
app.use(Bodyparser());

var router = new Router();

router.get('/hello/:name/:id([0-9]{3})', (ctx) => {
    getMessage(ctx);
});

router.post('/hello', (ctx) => {
    postMessage(ctx);
});

router.all('/test', (ctx) => {
    allMessages(ctx);
});

router.get('/notfound', (ctx) => {
    printErrorMessage(ctx);
})

router.get('/request/1', (ctx) => {
    getMessage(ctx);
})

router.get('/request/2', (ctx) => {
    getMessage(ctx);
})


router.get('/request/*', function* (next){
    console.log('A new request ' + Date.now());
    yield next;
})


app.use(router.routes());


function allMessages(ctx){
    ctx.body = {msg: 'Hello Worlds!'};
};

function getMessage(ctx){
    console.log(ctx.request.query);
    ctx.status = 200;
    ctx.body = 'id: ' + ctx.params.id + ' and name: ' + ctx.params.name;    
    console.log(ctx.response)
};

function postMessage(ctx){
    ctx.status = 200;
    ctx.body = "Hello World -> post";
};

function printErrorMessage(ctx){
    ctx.status = 404;
    ctx.body = "Alakazam dude!";
};

function* handle404Errors(next){
    if (404 != this.status){
        return;
    }

    this.redirect('/notfound');
}

app.use(handle404Errors);

app.listen(3000);