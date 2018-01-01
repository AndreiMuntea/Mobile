import React, {Component} from 'react';
import {Text, View} from 'react-native';


import LoginComponent from "./app/components/LoginComponent/LoginComponent"
import MainMenuComponent from "./app/components/MainMenuComponent/MainMenuComponent"
import AddBookComponent from "./app/components/AddBookComponent/AddBookComponent"

export default class App extends Component{
  render(){
    return(
      <View>
        <AddBookComponent/>
      </View>
    );
  }
}