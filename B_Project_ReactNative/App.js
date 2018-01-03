import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {applyMiddleware, createStore, combineReducers} from "redux"
import {userReducer} from "./app/stores/UserStore";

import LoginComponent from "./app/components/LoginComponent/LoginComponent"
import MainMenuComponent from "./app/components/MainMenuComponent/MainMenuComponent"
import AddBookComponent from "./app/components/AddBookComponent/AddBookComponent"
import SingleBookComponent from "./app/components/SingleBookComponent/SingleBookComponent"
import BooksComponent from "./app/components/BooksComponent/BooksComponent"

const rootReducer = combineReducers({userReducer: userReducer});
const store = createStore(rootReducer, applyMiddleware(thunk));

const Navigator = StackNavigator({
  Login: {
      screen: LoginComponent,
  },
  MainMenu: {
    screen : MainMenuComponent,
  },
  AddBook: {
    screen: AddBookComponent,
  },
  BooksView:{
    screen: BooksComponent
  }
});

export default class App extends Component{
  render(){
      return <Navigator screenProps={{store:store}}/>;
  }
}