import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import {getAllBooks, getBooksForUser} from "../../stores/BookStore"


export default class BooksComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {books: [], author: '', displayModel: [], myBooks: []}
        this.store = this.props.screenProps.store;

        const { params } = this.props.navigation.state;
        this.myScreen = params.myBooksOnly;

        this.getAll();
        this.getMyBooks();
    }

    onItemClick(book){
        var tags = [];

        for(let i = 0; i < book.tags.length; ++i){
            tags.push({key:book.tags[i].tag});
        }

        const {navigate} = this.props.navigation;
        navigate('SingleBookView', {
            id: book.id,
            title: book.title, 
            author: book.author, 
            date: book.date, 
            description: book.description, 
            tags: tags, 
            rating: book.rating 
        });

        console.log(book);
    }

    updateDisplayModel(){
        var books = this.state.books;
        if (this.myScreen == true){
            books = this.state.myBooks;
        }
        
        var displayModel = [];
        for(let i = 0; i < books.length; ++i){
           let k = books[i].author + "-" + books[i].title;
           displayModel.push({key: k, book:books[i]}); 
        }
        this.setState({...this.state, displayModel: displayModel});
    }

    onAuthorNameChange(text){
        var displayModel = [];

        var books = this.state.books;
        if (this.myScreen == true){
            books = this.state.myBooks;
        }

        for(let i = 0; i < books.length; ++i){
            let book = books[i];
            
            if(book.author.includes(text) == false){
                continue;
            }

            let k = book.author + "-" + book.title;
            displayModel.push({key: k, book:books[i]}); 
         }

        this.setState({...this.state, displayModel: displayModel, author:text});
    }

    getAll(){
        this.store.dispatch(getAllBooks())
            .then(() => {
                // SUCCESS
                if (this.store.getState().bookReducer.data != null){
                   this.setState({...this.state, books:this.store.getState().bookReducer.data});
                   this.updateDisplayModel();
                }
            });
    }

    getMyBooks(){
        this.store.dispatch(getBooksForUser(this.store.getState().userReducer.username))
            .then(() => {
                // SUCCESS
                if (this.store.getState().bookReducer.data != null){
                    this.setState({...this.state, myBooks:this.store.getState().bookReducer.data});
                    this.updateDisplayModel();
                }
            });
    }

      
  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent 
                label='Author' 
                initialText='' 
                editableInputType={true} 
                textUpdated={(text) => this.onAuthorNameChange(text)}
            />
            <FlatList
                style={styles.flatListViewStyle}
                data={this.state.displayModel}
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => this.onItemClick(item.book)}>
                        <Text style={styles.item}>{item.key}</Text>
                    </TouchableOpacity>
                }
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    flatListViewStyle: {
        height:400,
        paddingLeft: 20,
        width: 350
    },
});


AppRegistry.registerComponent("BooksComponent", () => BooksComponent);