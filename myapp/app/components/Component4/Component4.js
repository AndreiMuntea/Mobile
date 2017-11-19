import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet} from 'react-native';

const books = [
  {
    author:'J.R.R. Tolkien',
    name:'Lords of the Rings'
  },
  {
    author:'J.K. Rowling',
    name:'Harry Potter'
  },
  {
    author:'Paula Hawkins',
    name:'The Girl on the Train'
  },
  {
    author:'Franz Kafka',
    name:'The Trial'
  },
  {
    author:'Neil Gaiman',
    name:'American Gods'
  }
]

export default class Component4 extends Component{
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state ={
      booksDataSource: ds.cloneWithRows(books)
    }
  }

  renderRow(book, sectionId, rowId, highlightRow){
    return(
      <View style={styles.row}>
        <Text style={styles.rowText}>{book.name} - {book.author}</Text>
      </View>
    );
  }

  render(){
    return(
      <ListView
        dataSource={this.state.booksDataSource}
        renderRow={this.renderRow.bind(this)}
      >
      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'center',
    padding:10,
    backgroundColor:'#f4f4f4',
    marginBottom:3
  },
  rowText:{
    flex:1
  }
})

AppRegistry.registerComponent('Component4', () => Component4);
