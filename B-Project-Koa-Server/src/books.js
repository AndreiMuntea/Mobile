import Router from 'koa-router';
import {setStatus, OK, BAD_REQUEST} from "./utils.js";


export class BooksRouter extends Router{
    constructor(args){
        super(args);

        this.booksDatabase = args.booksDatabase;
        this.tagsDatabase = args.tagsDatabase;
        this.bookTagsDatabase = args.bookTagsDatabase;

        this.put('/books/add', async (context, next)=>{
            await this.handleAddBook(context);
        });

        this.get('/books/get', async(context, next) =>{
            await this.handleGetAllBooks(context);
        });

        this.get('/books/get/author/:authorName', async(context, next) =>{
            await this.handleGetAllByAuthor(context);
        });

        this.put('/tags/add', async (context, next)=>{
            await this.handleAddTag(context);
        });

        this.get('/tags/get', async(context, next) =>{
            await this.handleGetAllTags(context);
        });

        this.put('/books/tagBook/:bookId/:tag', async(context, next)=>{
            await this.handleTagBook(context);
        });

        this.get('/books/get/tag/:tag', async(context, next)=>{
            await this.handleGetBooksWithTag(context);
        });

        this.get('/tags/get/book/:bookId', async(context, next)=>{
            await this.handleGetTagsForBook(context);
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

    async handleGetAllBooks(context){
        var books = await this.booksDatabase.cfind({}).exec();
        setStatus(context, OK, {books: books});
    }

    async handleGetAllByAuthor(context){
        var authorName = context.params.authorName;

        var books = await this.booksDatabase.cfind({author:authorName}).exec();
        setStatus(context, OK, {books: books});
    }

    async handleAddTag(context){
        var requestBody = context.request.body;
        
        if (!requestBody.tag){
            setStatus(context, BAD_REQUEST, {error: "No tag!"});
            return;
        };

        var tag = await this.findTag(requestBody.tag);
        
        if (tag != null){
            setStatus(context, BAD_REQUEST, {error: "This tag already exists!"});
            return;
        }

        await this.tagsDatabase.insert([{tag:requestBody.tag}]);
        
        var retTag = await this.findTag(requestBody.tag);
        setStatus(context, OK, {tag: retTag});
    }

    async handleGetAllTags(context){
        var tags = await this.tagsDatabase.cfind({}).exec();
        setStatus(context, OK, {tags: tags});
    }

    async findTag(tag){
        return await this.tagsDatabase.findOne({tag:tag});
    }

    async handleTagBook(context){
        var bookId = context.params.bookId;
        var tag = context.params.tag;

        var foundBook = await this.booksDatabase.findOne({_id:bookId});
        if(foundBook == null){
            setStatus(context, BAD_REQUEST, {error: "Book not found"});
            return;
        }

        var foundTag = await this.findTag(tag);
        if (foundTag == null){
            setStatus(context, BAD_REQUEST, {error: "Tag not found"});
            return;
        }

        var bookTag = await this.bookTagsDatabase.findOne({bookId:bookId, tag:tag});
        if (bookTag != null){
            setStatus(context, BAD_REQUEST, {error: "Tag already assigned"});
            return;
        }

        await this.bookTagsDatabase.insert([{bookId:bookId, tag:tag}]);
        setStatus(context, OK, {});
    }

    async handleGetBooksWithTag(context){
        var tag = context.params.tag;
        
        var allBooks = await this.bookTagsDatabase.cfind({tag:tag}).exec();
        var books = [];

        for(let i = 0; i < allBooks.length; ++i){
            let b = await this.booksDatabase.findOne({_id:allBooks[i]["bookId"]});
            books.push(b);
        }

        setStatus(context, OK, {books: books});
    }

    async handleGetTagsForBook(context){
        var bookId = context.params.bookId;

        var tags = await this.bookTagsDatabase.cfind({bookId:bookId}).projection({tag:1, _id:0}).exec();
        
        setStatus(context, OK, {tags: tags});
    }
}