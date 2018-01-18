import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, FlatList, Text, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import {Rating} from 'react-native-ratings';
import { Bar } from 'react-native-pathjs-charts'

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import {getAllBooks, getBooksForUser} from "../../stores/BookStore"


export default class BooksComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {books: [], author: '', displayModel: [], myBooks: [], chartData:[]}
        this.store = this.props.screenProps.store;

        const { params } = this.props.navigation.state;
        this.myScreen = params.myBooksOnly;

        this.getAll();
        this.getMyBooks();
    }

    updateState() {
        const bookReducer = this.store.getState().bookReducer;
        this.setState( {...this.state, books: bookReducer.books, myBooks: bookReducer.myBooks});
        this.updateDisplayModel();
        this.getPiechartData();
        //console.log(state);
      }
      
      componentWillMount() {
        console.log('ComponentWillMount');
        this.updateState();
      }
    
      componentDidMount() {
          console.log('ComponentDidMount');
          this.unsubscribe = this.store.subscribe(() => this.updateState());
      }
    
      componentWillUnmount() {
        console.log('ComponentWillUnmount');
        this.unsubscribe();
      }
    

    getPiechartData(){
        var books = this.state.books;
        if (this.myScreen == true){
            books = this.state.myBooks;
        }

        var tags = {}
        for(let i = 0; i < books.length; ++i){
            for(let j = 0; j < books[i].tags.length; ++j){
                let tag = books[i].tags[j];
                if(!(tag.tag in tags)){
                    tags[tag.tag] = 0
                    console.log("TAAAAAAAAAAGS", tags);
                }
                tags[tag.tag]++;
            }
        }

        result = []
        for(var key in tags){
            result.push([{tag: key, amount:tags[key]}]);
        }
        console.log(tags);
        console.log(result);
        this.setState({...this.state, chartData:result});
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
        
        this.store.dispatch(getAllBooks(this.store.getState().userReducer.token));
    }

    getMyBooks(){
        this.store.dispatch(getBooksForUser(this.store.getState().userReducer.token, this.store.getState().userReducer.username));
    }

      
  render(){
    return(
        <View>
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
                extraData={this.state}
            />
            {this.state.chartData.length !== 0 &&
                <Bar data={this.state.chartData}
                     options={this.options}
                     accessorKey="amount"
                />
            }
      </View>
    );
  }

      /*
    Options for chart display
     */
    options = {
        width: 300,
        height: 300,
        margin: {
            top: 20,
            left: 25,
            bottom: 50,
            right: 20
        },
        color: '#2980B9',
        gutter: 20,
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
        },
        axisX: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'bottom',
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E',
                rotate: 45
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
            }
        }
    };
}

const styles = StyleSheet.create({
    flatListViewStyle: {
        height:160,
        paddingLeft: 20,
        width: 350
    },
});


AppRegistry.registerComponent("BooksComponent", () => BooksComponent);