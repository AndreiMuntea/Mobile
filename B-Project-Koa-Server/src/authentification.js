import Router from 'koa-router';
import {setStatus, OK, BAD_REQUEST} from "./utils.js";
import jwt from 'jsonwebtoken';

export const jwtConfig = {
    secret: 'my-secret'
}

function createToken(user) {
    return jwt.sign({username: user.username, _id: user._id},
        jwtConfig.secret, {expiresIn: 60*60*60});
}

export class AuthentificationRouter extends Router{
    constructor(args){
        super(args);

        this.usersDatabase = args.usersDatabase;

        this.post('/login', async (context, next)=>{
            await this.handleLoginRequest(context);
        });

        this.post('/register', async(context, next) =>{
            await this.handleRegisterRequest(context);
        });
    }

    async handleLoginRequest(context){
		console.log(context)
        var requestBody = context.request.body;

        if (!requestBody.username || !requestBody.password){
            setStatus(context, BAD_REQUEST, {error: "Username and password not set!"});
            return;
        };

        var user = await this.findUser(requestBody.username);

        // No user found
        if (user == null){
            setStatus(context, BAD_REQUEST, {error: "No user found"});
            return;
        };

        if(!(requestBody.password === user.password)){
            setStatus(context, BAD_REQUEST, {error: "Invalid password"});
            return;
        };

        setStatus(context, OK, {token: createToken(requestBody.username)});
    }

    async handleRegisterRequest(context){
        var requestBody = context.request.body;
        
        if (!requestBody.username || !requestBody.password){
            setStatus(context, BAD_REQUEST, {error: "Username and password not set!"});
            return;
        };

        var user = await this.findUser(requestBody.username);

        // User found
        if (user != null){
            setStatus(context, BAD_REQUEST, {error: "An user with this username is already registered"});
            return;
        };

        await this.usersDatabase.insert([{username: requestBody.username, password: requestBody.password}]);
        setStatus(context, OK, {token: '0'});
    }

    async findUser(username){
        return await this.usersDatabase.findOne({username:username});
    }
}