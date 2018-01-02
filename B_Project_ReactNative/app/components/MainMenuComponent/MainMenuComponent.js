import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Image} from 'react-native';


export default class MainMenuComponent extends Component{

  render(){
    return(
      <View style={styles.inlineView}>
        <Image style={styles.imgView} source={require('./images/allbooks.png')} />
        <Image style={styles.imgView} source={require('./images/mybooks.png')} />
        <Image style={styles.imgView} source={require('./images/addbook.png')} />
      </View>
    );
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