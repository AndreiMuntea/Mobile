import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';


export default class LoginComponent extends Component{

  loginButtonClicked(){

  }

  signupButtonClicked(){

  }

  render(){
    return(
      <View style={styles.parentView}>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Username: </Text>
                <TextInput
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Password: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.loginButtonClicked}
                >
                    <Text style={styles.textView}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.signupButtonClicked}
                >
                    <Text style={styles.textView}>Sign Up</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    parentView : {
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textView: {
        fontSize: 20,
        padding: 10,
    },
    textField: {
        fontSize: 14,
        flex: 0.9
    },
    inlineView: {
        flexDirection: 'row',
        padding: 10
    },
    buttonStyle:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        flex: 0.5,
        marginRight: 10,
        marginLeft: 10
    }
});


AppRegistry.registerComponent("LoginComponent", () => LoginComponent);