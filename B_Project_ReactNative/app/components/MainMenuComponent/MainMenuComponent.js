import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Image, TouchableOpacity} from 'react-native';


export default class MainMenuComponent extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style={styles.inlineView}>
        <TouchableOpacity onPress={() => this.allBooksClick()}>
          <Image style={styles.imgView} source={require('./images/allbooks.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.myBooksClick()}>
          <Image style={styles.imgView} source={require('./images/mybooks.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.addBookClick()}>
          <Image style={styles.imgView} source={require('./images/addbook.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  allBooksClick(){
    const {navigate} = this.props.navigation;
    navigate('BooksView');
  }

  myBooksClick(){
    const {navigate} = this.props.navigation;
    navigate('BooksView');
  }

  addBookClick(){
    const {navigate} = this.props.navigation;
    navigate('AddBook');
  }
}

const styles = StyleSheet.create({
  inlineView: {
    flexDirection: 'row',
    padding: 10
  },
  imgView: {
    width: 104,
    height: 92,
    marginTop:16,
    marginLeft:14,
    marginRight:13
  }
});


AppRegistry.registerComponent("MainMenuComponent", () => MainMenuComponent);