export class Book{
    constructor(id, description, author, date, title, rating){
        this.id = id;
        this.description = description;
        this.author = author;
        this.date = date;
        this.title = title;
        this.rating = rating;
        this.tags = [];
    }
}