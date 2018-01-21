import {Book} from "../model/Book"
import {Tag} from "../model/Tag"
import {callServerGetAPI, callServerPostAPI, callServerPutAPI, authHeaders} from "./api"
import {getItem, saveOrUpdate, getAllBooksFromLocalStorage} from "../localStorage/LocalStorage"

const initialState = {fetching: false, error: null, fetched: false, data: null, books: [], myBooks: []};

const GET_ALL_BOOKS_PENDING = "GET_ALL_BOOKS_PENDING"
const GET_ALL_BOOKS_FULFILLED = "GET_ALL_BOOKS_FULFILLED"
const GET_ALL_BOOKS_ERROR = "GET_ALL_BOOKS_ERROR"

const GET_ALL_BOOKS_FOR_USER_PENDING = "GET_ALL_BOOKS_FOR_USER_PENDING"
const GET_ALL_BOOKS_FOR_USER_FULFILLED = "GET_ALL_BOOKS_FOR_USER_FULFILLED"
const GET_ALL_BOOKS_FOR_USER_ERROR = "GET_ALL_BOOKS_FOR_USER_ERROR"

const GET_BOOK_PENDING = "GET_BOOK_PENDING"
const GET_BOOK_FULFILLED = "GET_BOOK_FULFILLED"
const GET_BOOK_ERROR = "GET_BOOK_ERROR"

const RATE_BOOK_PENDING = "RATE_BOOK_PENDING"
const RATE_BOOK_FULFILLED = "RATE_BOOK_FULFILLED"
const RATE_BOOK_ERROR = "RATE_BOOK_ERROR"

const ADD_BOOK_PENDING = "ADD_BOOK_PENDING"
const ADD_BOOK_FULFILLED = "ADD_BOOK_FULFILLED"
const ADD_BOOK_ERROR = "ADD_BOOK_ERROR"

const TAG_BOOK_PENDING = "TAG_BOOK_PENDING"
const TAG_BOOK_FULFILLED = "TAG_BOOK_FULFILLED"
const TAG_BOOK_ERROR = "TAG_BOOK_ERROR"



export const bookReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_BOOKS_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case GET_ALL_BOOKS_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload, books: action.payload}
        }
        case GET_ALL_BOOKS_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case GET_ALL_BOOKS_FOR_USER_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case GET_ALL_BOOKS_FOR_USER_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload, myBooks: action.payload}
        }
        case GET_ALL_BOOKS_FOR_USER_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case GET_BOOK_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case GET_BOOK_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload}
        }
        case GET_BOOK_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case RATE_BOOK_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case RATE_BOOK_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload}
        }
        case RATE_BOOK_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case ADD_BOOK_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case ADD_BOOK_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload}
        }
        case ADD_BOOK_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        case TAG_BOOK_PENDING: {
            return {...state, fetching:true, fetched:false, error:null, data: null}
        }
        case TAG_BOOK_FULFILLED: {
            return {...state, fetching:false, fetched:true, data: action.payload}
        }
        case TAG_BOOK_ERROR: {
            return {...state, fetching:false, error:action.payload, fetched:true}
        }
        default:
            return state;
    }
}

function fetchBook(result){
    console.log(result);
    return new Book(result._id, result.description, result.author, result.date, result.title, result.rating);
}

async function fetchBooksFromResult(result){
    var books = [];

    for(let i = 0; i < result.length; ++i){
        let aux = result[i].book;
        var tags = [];
    
        let b = new Book(aux._id, aux.description, aux.author, aux.date, aux.title, result[i].rating);
        
        for (let j = 0; j < result[i].tags.length; ++j){
            let t = result[i].tags[j];
            let tag = new Tag(t.tag);
            tags.push(tag);
        }
    
        b.tags = tags;

        await saveOrUpdate(b.id, b);

        books.push(b);
    }

    return books;
}


export const getAllBooks = (token) => async(dispatch) => {
    dispatch({type: GET_ALL_BOOKS_PENDING});

    // First get all from local storage
    var locals = await getAllBooksFromLocalStorage();
    console.log("LOOOCAAAALS", locals);
    dispatch({type:GET_ALL_BOOKS_FULFILLED, payload:locals});

    var result = await callServerGetAPI("/books/get", null, authHeaders(token));

    if (result.status == false){
        dispatch({type: GET_ALL_BOOKS_ERROR, payload:result});
    } else {
        let books = await fetchBooksFromResult(result);
        dispatch({type: GET_ALL_BOOKS_FULFILLED, payload: books});
    }
} 


export const getBooksForUser = (token, username) => async(dispatch) => {
    dispatch({type: GET_ALL_BOOKS_FOR_USER_PENDING});

    var user = await getItem(username);
    var locals = user.books;
    dispatch({type:GET_ALL_BOOKS_FOR_USER_FULFILLED, payload:locals});

    console.log("Got local books");
    var result = await callServerGetAPI("/books/get/username/" + username, null, authHeaders(token));
    console.log("Got server books");
    if (result.status == false || result.error != undefined){
        dispatch({type: GET_ALL_BOOKS_FOR_USER_ERROR, payload:result});
    } else {
        let books = await fetchBooksFromResult(result);
        user.books = books;
        dispatch({type: GET_ALL_BOOKS_FOR_USER_FULFILLED, payload: books});
        console.log("UPDATING USER", user);
        await saveOrUpdate(username, user);
    }
} 


export const addBook = (token, book) => async(dispatch) => {
    dispatch({type: ADD_BOOK_PENDING});

    console.log(book);

    var result = await callServerPutAPI("/books/add", book, authHeaders(token));

    if (result.status == false || result.error != undefined){
        dispatch({type: ADD_BOOK_ERROR, payload:result});
    } else {
        let book = fetchBook(result);
        dispatch({type: ADD_BOOK_FULFILLED, payload: book});
    }
}

export const tagBook = (token, bookId, tag) => async(dispatch) => {
    dispatch({type: TAG_BOOK_PENDING});
    var result = await callServerPutAPI("/books/tagBook/" + bookId + "/" + tag, {}, authHeaders(token));

    if (result.status == false || result.error != undefined){
        dispatch({type: TAG_BOOK_ERROR, payload:result});
    } else {
        dispatch({type: TAG_BOOK_FULFILLED, payload: result});
    }
}

export const rateBook = (token, username, bookId, rating) => async(dispatch) => {
    dispatch({type: RATE_BOOK_PENDING});
    var result = await callServerPutAPI("/books/rate/" + username + "/" + bookId, {rating: rating}, authHeaders(token));

    if (result.status == false || result.error != undefined){
        dispatch({type: RATE_BOOK_ERROR, payload:result});
    } else {
        dispatch({type: RATE_BOOK_FULFILLED, payload: result});
    }
}