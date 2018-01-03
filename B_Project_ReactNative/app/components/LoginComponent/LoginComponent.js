import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import DoubleButtonsComponent from "../InlineComponents/DoubleButtonComponent"
import PasswordComponent from "../InlineComponents/PasswordComponent"

import {login, signup} from "../../stores/UserStore"
import {User} from "../../model/User"

export default class LoginComponent extends Component{
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''};
    this.store = this.props.screenProps.store;
  }

  updateState() {
    const userReducer = this.store.getState().userReducer;
    const state = {...this.state, ...userReducer};

    this.setState(state);
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


  loginButtonClicked(){
    console.log("Login with username: ", this.state.username);
    console.log("Login with password: ", this.state.password);

    var user = new User(this.state.username, this.state.password);

    console.log("USER:", user);
    this.store.dispatch(login(user))
      .then(() => {
        // SUCCESS
        if (this.store.getState().userReducer.token != null){
          const {navigate} = this.props.navigation;
          navigate('MainMenu');
        }
      })
  }


  signupButtonClicked(){
    console.log("Signup with username: ", this.state.username);
    console.log("Signup with password: ", this.state.password);

    var user = new User(this.state.username, this.state.password);

    console.log("USER:", user);
    this.store.dispatch(signup(user))
      .then(() => {
        // SUCCESS
        if (this.store.getState().userReducer.token != null){
            Alert.alert("Successful signup!");
        }else{
          console.log(this.store.getState().userReducer.error);
          Alert.alert("Error at signup " + this.store.getState().userReducer.error.error);
        }
      })
  }

  render(){
    return(
      <View style={styles.parentView}>
            <TextFieldComponent 
                label='Username' 
                initialText='' 
                editableInputType={true} 
                textUpdated={(text) => this.setState({...this.state, username:text})}
            />
            <PasswordComponent 
                label='Password' 
                textUpdated={(text) =>this.setState({...this.state, password:text})}
            />
            <DoubleButtonsComponent
                firstButtonLabel='Login'
                firstButtonClicked={() => this.loginButtonClicked()}
                secondButtonLabel='Signup'
                secondButtonClicked={() => this.signupButtonClicked()}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    parentView : {
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


AppRegistry.registerComponent("LoginComponent", () => LoginComponent);