import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import DoubleButtonsComponent from "../InlineComponents/DoubleButtonComponent"
import PasswordComponent from "../InlineComponents/PasswordComponent"

export default class LoginComponent extends Component{
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''};
  }

  loginButtonClicked(){
    console.log("Login with username: ", this.state.username);
    console.log("Login with password: ", this.state.password);
  }

  signupButtonClicked(){
    console.log("Signup with username: ", this.state.username);
    console.log("Signup with password: ", this.state.password);
  }

  render(){
    return(
      <View style={styles.parentView}>
            <TextFieldComponent 
                label='Username' 
                initialText='' 
                editableInputType={true} 
                textUpdated={(text) => this.state.username = text}
            />
            <PasswordComponent 
                label='Password' 
                textUpdated={(text) => this.state.password = text}
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