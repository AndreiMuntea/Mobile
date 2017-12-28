import Router from 'koa-router';
import {setStatus, getDate, OK, BAD_REQUEST} from "./utils.js";


export class BooksRouter extends Router{
    constructor(args){
        super(args);

        this.booksDatabase = args.booksDatabase;

        this.put('/books/add', async (context, next)=>{
            await this.handleAddBook(context);
        });

        this.get('/books/get', async(context, next) =>{
            await this.handleGetAll(context);
        });

        this.get('/books/get/:authorName', async(context, next) =>{
            await this.handleGetAllByAuthor(context);
        });
    }

    async handleAddBook(context){
        var requestBody = context.request.body;

        if (!requestBody.title || !requestBody.author || !requestBody.date || !requestBody.description){
            setStatus(context, BAD_REQUEST, {error: "A book should have title, author, date and description!"});
            return;
        };
        
        var date = getDate(requestBody.date);

        if (date == null){
            setStatus(context, BAD_REQUEST, {error: "Invalid date format! The format should be yyyy-mm-dd!"});
            return;
        };

        var book = await this.findBook(requestBody.title, requestBody.author, date);

        // Book already exists
        if (book != null){
            setStatus(context, BAD_REQUEST, {error: "A book with this details already exists"});
            return;
        };

        await this.booksDatabase.insert([{title: requestBody.title, author: requestBody.author, date:date, description: requestBody.description}]);
        
        var retBook = await this.findBook(requestBody.title, requestBody.author, date);
        setStatus(context, OK, {book: retBook});
    }

    async findBook(title, author, date){
        return await this.booksDatabase.findOne({title:title, author:author, date:date});
    }

    async handleGetAll(context){
        var books = await this.booksDatabase.cfind({}).exec();
        setStatus(context, OK, {books: books});
    }

    async handleGetAllByAuthor(context){
        var authorName = context.params.authorName;

        var books = await this.booksDatabase.cfind({author:authorName}).exec();
        setStatus(context, OK, {books: books});
    }
}