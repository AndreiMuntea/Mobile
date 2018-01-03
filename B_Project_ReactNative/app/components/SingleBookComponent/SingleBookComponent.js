import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import StaticFlatList from "../InlineComponents/StaticFlatList"

import {rateBook} from "../../stores/BookStore"

export default class SingleBookComponent extends Component{
    constructor(props) {
        super(props);
    
        const { params } = this.props.navigation.state;

        const date = new Date(params.date);

        this.state = {
            id: params.id,
            title: params.title, 
            author: params.author, 
            date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(), 
            description: params.description, 
            tags: params.tags, 
            rating:params.rating 
        };

        this.store = this.props.screenProps.store;
        
        console.log(this.state);
    }

    rateBook(rating){
        console.log(this.store.getState());
        let username = this.store.getState().userReducer.username;
        let bookId = this.state.id;

        this.store.dispatch(rateBook(username, bookId, rating))
          .then(() => {
            // SUCCESS
            if (this.store.getState().bookReducer.data != null){
                console.log(this.store.getState().bookReducer.data);
                this.setState({...this.state, rating:this.store.getState().bookReducer.data});
            }
          })
    }

    

  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent 
                label='Title' 
                initialText={this.state.title} 
                editableInputType={true} 
                textUpdated={(text) => {}}
            />
            <TextFieldComponent 
                label='Author' 
                initialText={this.state.author}
                editableInputType={true} 
                textUpdated={(text) => {}}
            />
            <TextFieldComponent 
                label='Publication Date' 
                initialText={this.state.date}
                editableInputType={true} 
                textUpdated={(text) => {}}
            />
            <TextFieldComponent 
                label='Description' 
                initialText={this.state.description}
                editableInputType={true} 
                textUpdated={(text) => {}}
            />
            <StaticFlatList 
                label='Tags' 
                data={this.state.tags} 
            />
            <AirbnbRating 
                count={5}
                reviews={["Terrible", "Meh", "OK", "Wow", "Jesus"]}
                defaultRating={this.state.rating}
                size={20}
                onFinishRating={(rating) => this.rateBook(rating)}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    ratingStyle: {
        paddingLeft: 50
    }
});


AppRegistry.registerComponent("SingleBookComponent", () => SingleBookComponent);