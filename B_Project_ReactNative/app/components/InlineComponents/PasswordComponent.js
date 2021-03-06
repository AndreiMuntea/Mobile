import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, StyleSheet} from 'react-native';


export default class PasswordComponent extends Component{
  render(){
    return(
        <View style={styles.inlineView}>
            <Text style={styles.textView}>{this.props.label}: </Text>
            <TextInput
                style={styles.textField}
                secureTextEntry={true}
                placeholder=""
                onChangeText={(text) => this.props.textUpdated(text)}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    textView: {
        fontSize: 20,
        padding: 10,
        width: 150
    },
    textField: {
        fontSize: 14,
        flex: 0.9
    },
    inlineView: {
        flexDirection: 'row',
        padding: 10
    }
});


AppRegistry.registerComponent("PasswordComponent", () => PasswordComponent);