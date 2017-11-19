var Router = require('koa-router');
var movieRouter = new Router({
    prefix: '/movies'
});

var movies = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
 ];

 movieRouter.get('/', (ctx) => {
    ctx.body = movies;
 });

 movieRouter.get('/:id([0-9]{3})', (ctx) => {
    var id = parseInt(ctx.params.id);
    var movie = movies.find(movie => id === movie.id);

    if(movie){
        ctx.response.body = movie;
        ctx.response.status = 200;
    }
    else{
        ctx.response.body = { issue: [{ warning: 'Movie with id ' + id  + ' not found'}]};
        ctx.response.status = 404;
    }

 });

 module.exports = movieRouter;