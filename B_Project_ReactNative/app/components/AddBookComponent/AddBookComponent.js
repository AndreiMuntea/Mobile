import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import DoubleButtonsComponent from "../InlineComponents/DoubleButtonComponent"
import DynamicFlatListComponent from "../InlineComponents/DynamicFlatListComponent"

import {addBook, tagBook} from "../../stores/BookStore"
import {Book} from "../../model/Book"

export default class AddBookComponent extends Component{
    constructor(props) {
        super(props);
        
        this.state = {bookId: '', title: '', author: '', publicationDate: '', description: '', tags: []};
        this.store = this.props.screenProps.store;
    }

  addBookButtonClicked(){
    let b = new Book("", this.state.description, this.state.author, this.state.publicationDate, this.state.title, 0.0);

    this.store.dispatch(addBook(b))
        .then(() => {
            book = this.store.getState().bookReducer.data;
            // SUCCESS
            if (book != null){        
                console.log(book);
                this.setState({...this.state, bookId: book.id})
            } else{
                console.log(this.store.getState().userReducer.error);
                Alert.alert("Error at adding book " + this.store.getState().userReducer.error.error);
            }
        })
  }

  tagBookButtonClicked(){
    for(let i = 0; i < this.state.tags.length; ++i){
        this.store.dispatch(tagBook(this.state.bookId, this.state.tags[i].tag))
            .then(() => {
                book = this.store.getState().bookReducer.data;
                // SUCCESS
                if (book != null){        
                    console.log(book);
                }
            })
    }
  }

  newTagAdded(tag){
    let tags = this.state.tags;
    tags.push(tag);

    console.log(tags);
    this.setState({...this.state, tags:tags});
  }

  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent 
                label='Book ID' 
                initialText={this.state.bookId}
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, bookId:text})}
            />
            <TextFieldComponent 
                label='Title' 
                initialText={this.state.title}
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, title:text})}
            />
            <TextFieldComponent 
                label='Author' 
                initialText={this.state.author}
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, author:text})}
            />
            <TextFieldComponent 
                label='Publication Date' 
                initialText={this.state.publicationDate}
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, publicationDate:text})}
            />
            <TextFieldComponent 
                label='Description' 
                initialText={this.state.description}
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, description:text})}
            />
            <DynamicFlatListComponent 
                label='Tags' 
                data={this.state.tags}
                newItemCallback={(tag) => this.newTagAdded(tag)}
            />
            <DoubleButtonsComponent
                firstButtonLabel='Add Book'
                firstButtonClicked={() => this.addBookButtonClicked()}
                secondButtonLabel='Tag Book'
                secondButtonClicked={() => this.tagBookButtonClicked()}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});


AppRegistry.registerComponent("AddBookComponent", () => AddBookComponent);