import Koa from 'koa';
import DataStore from 'nedb-promise';
import Router from 'koa-router';
import BodyParser from 'koa-bodyParser';
import Cors from 'koa-cors';
import Convert from 'koa-convert';
import http from 'http';
import SocketIo from 'socket.io';
import {AuthentificationRouter} from './authentification';

// App
const app = new Koa();
const server = http.createServer(app.callback());
const serverSocket = SocketIo(server);
const connections = {};

// Database stuffs
const usersDatabase = new DataStore({filename: '../B-Project-Storage/storage/users.json', autoload: true});

// Custom routes
const authentificationRouter = new AuthentificationRouter({usersDatabase});

app.use(BodyParser());
app.use(Convert(Cors()));

app.use(authentificationRouter.routes()).use(authentificationRouter.allowedMethods());


// serverSocket.on('connection', (socket) => {
//     socket.on('userConnect', (data) =>{
//         handleUserConnect(socket, data);
//     });
//     socket.on("userDisconnect", (data) => {
//         handleUserDisconnect(socket, data);
//     });
// });

// function handleUserConnect(socket, data){
//     console.log("New Connection: " + data);

//     if(connections[data] == undefined){
//         connections[data] = [];
//     }

//     connections[data].push(socket);
// }

// function handleUserDisconnect(socket, data){
//     console.log("Disconnected: " + data);

//     if(socket != undefined && connections[data] != undefined){
//         var index = connections[data].indexOf(socket);
//         if(index > -1){
//             connections[data].splice(index, 1);
//         }
//     }
// }

app.listen(3000);