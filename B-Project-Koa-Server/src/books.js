import Router from 'koa-router';
import {setStatus, getDate, getInt, OK, BAD_REQUEST} from "./utils.js";


export class BooksRouter extends Router{
    constructor(args){
        super(args);

        this.booksDatabase = args.booksDatabase;
        this.tagsDatabase = args.tagsDatabase;
        this.bookTagsDatabase = args.bookTagsDatabase;
        this.userBooksDatabase = args.userBooksDatabase;
        this.usersDatabase = args.usersDatabase;

        this.put('/books/add', async (context, next)=>{
            await this.handleAddBook(context);
        });

        this.get('/books/get', async(context, next) =>{
            await this.handleGetAllBooks(context);
        });

        this.get('/books/get/:bookId', async(context, next)=>{
            await this.handleGetSpecificBook(context);
        });

        this.get('/books/get/author/:authorName', async(context, next) =>{
            await this.handleGetAllByAuthor(context);
        });

        this.get('/books/get/username/:username', async(context, next) =>{
            await this.handleGetBooksForUser(context);
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

        this.delete('/books/delete/:bookId', async(context, next)=>{
            await this.handleDeleteBook(context);
        });

        this.put('/books/rate/:username/:bookId', async(context, next)=>{
            await this.handleRateBook(context);
        });
    }

    async handleAddBook(context){
        var requestBody = context.request.body;

        console.log(requestBody);

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
        console.log(retBook);

        setStatus(context, OK, {title: retBook["title"], author: retBook["author"], date: retBook["date"], description: retBook["description"], _id:retBook["_id"]});
    }

    async findBook(title, author, date){
        return await this.booksDatabase.findOne({title:title, author:author, date:date});
    }

    async handleGetAllBooks(context){
		
		console.log('GETTING ALLL BOOOOOOKS');
        var books = await this.booksDatabase.cfind({}).exec();

        var results = [];

        for(let i = 0; i < books.length; ++i){
            console.log(books[i]);
            let tags = await this.bookTagsDatabase.cfind({bookId:books[i]["_id"]}).projection({tag:1, _id:0}).exec();
            let rating = await this.calculateRating(books[i]["_id"]);
            results.push({book:books[i], tags:tags, rating:rating});
        }
        
        setStatus(context, OK, results);
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
            console.log("Insert new tag: ", tag);
            await this.tagsDatabase.insert([{tag:tag}]);
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

    async handleDeleteBook(context){
        var bookId = context.params.bookId;

        await this.bookTagsDatabase.remove({bookId:bookId}, {multi:true});
        await this.booksDatabase.remove({_id:bookId}, {multi:true});
        await this.userBooksDatabase.remove({_bookId:bookId}, {multi:true});

        setStatus(context, OK, {});
    }

    async handleRateBook(context){
        var bookId = context.params.bookId;
        var username = context.params.username;
        var requestBody = context.request.body;

        console.log("Rate book", bookId, username);

        if (!requestBody.rating){
            setStatus(context, BAD_REQUEST, {error: "No rating found!"});
            return;
        }

        var value = getInt(requestBody.rating);
        if (value == null || value < 0 || value > 5){
            setStatus(context, BAD_REQUEST, {error: "Rating should be a number between 0 and 5!"});
            return;
        }

        console.log("value", value);
        
        var user = await this.usersDatabase.findOne({username:username});
        if (user == null){
            setStatus(context, BAD_REQUEST, {error: "No user found!"});
            return;
        }

        var book = await this.booksDatabase.findOne({_id:bookId});
        if (book == null){
            setStatus(context, BAD_REQUEST, {error: "No book found!"});
            return;
        }

        var rating = await this.userBooksDatabase.findOne({username:username, bookId:bookId});
        console.log("rating", rating);

        if (rating != null){
            await this.userBooksDatabase.remove({_id:rating["_id"]});
        }
        await this.userBooksDatabase.insert({username:username, bookId:bookId, rating:value});

        var retRating = await this.calculateRating(bookId);
        setStatus(context, OK, {rating: retRating});
    }

    async handleGetSpecificBook(context){
        var bookId = context.params.bookId;
        var book = await this.booksDatabase.findOne({_id:bookId});

        if (book == null){
            setStatus(context, BAD_REQUEST, {error: "No book found!"});
            return;
        }

        var tags = await this.bookTagsDatabase.cfind({bookId:bookId}).projection({tag:1, _id:0}).exec();
        var rating = await this.calculateRating(bookId);

        setStatus(context, OK, {book:book, rating:rating, tags:tags});
    }

    async calculateRating(bookId){
        var ratings = await this.userBooksDatabase.cfind({bookId:bookId}).exec();

        if (ratings.length == 0){
            return 0.0;
        }
        
        var r = 0.0;
        for(let i = 0; i < ratings.length; ++i){
            r = r + ratings[i]["rating"];
        }

        return r / ratings.length;
    }

    async handleGetBooksForUser(context){
        var username = context.params.username;

        var bookIds = await this.userBooksDatabase.cfind({username:username}).exec();
        
        var results = [];
        
        for(let i = 0; i < bookIds.length; ++i){
            let book = await this.booksDatabase.findOne({_id:bookIds[i]["bookId"]});
            let tags = await this.bookTagsDatabase.cfind({bookId:bookIds[i]["bookId"]}).projection({tag:1, _id:0}).exec();
            let rating = await this.calculateRating(bookIds[i]["bookId"]);
            results.push({book:book, tags:tags, rating:rating});
			console.log("rating for book:", rating)
        }
        setStatus(context, OK, results);
    }
}