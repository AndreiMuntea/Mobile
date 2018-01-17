import Koa from 'koa';
import DataStore from 'nedb-promise';
import Router from 'koa-router';
import BodyParser from 'koa-bodyParser';
import Cors from 'koa-cors';
import Convert from 'koa-convert';
import http from 'http';
import SocketIo from 'socket.io';
import {AuthentificationRouter} from './authentification';
import {BooksRouter} from './books';

// App
const app = new Koa();
const server = http.createServer(app.callback());
const serverSocket = SocketIo(server);

// Database stuffs
const usersDatabase = new DataStore({filename: '../B-Project-Storage/storage/users.json', autoload: true});
const booksDatabase = new DataStore({filename: '../B-Project-Storage/storage/books.json', autoload: true});
const tagsDatabase  = new DataStore({filename: '../B-Project-Storage/storage/tags.json', autoload: true});
const bookTagsDatabase  = new DataStore({filename: '../B-Project-Storage/storage/bookTags.json', autoload: true});
const userBooksDatabase  = new DataStore({filename: '../B-Project-Storage/storage/userBooks.json', autoload: true});

// Custom routes
const authentificationRouter = new AuthentificationRouter({usersDatabase});
const booksRouter = new BooksRouter({booksDatabase, tagsDatabase, bookTagsDatabase, userBooksDatabase, usersDatabase, serverSocket});

app.use(BodyParser());
app.use(Convert(Cors()));

app.use(authentificationRouter.routes()).use(authentificationRouter.allowedMethods());
app.use(booksRouter.routes()).use(booksRouter.allowedMethods());

server.listen(3000);