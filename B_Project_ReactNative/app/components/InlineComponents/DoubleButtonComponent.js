import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableOpacity, StyleSheet} from 'react-native';


export default class DoubleButtonsComponent extends Component{
  render(){
    return(
        <View style={styles.inlineView}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.props.firstButtonClicked}
                >
                    <Text style={styles.textView}>{this.props.firstButtonLabel}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.props.secondButtonClicked}
                >
                    <Text style={styles.textView}>{this.props.secondButtonLabel}</Text>
                </TouchableOpacity>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    textView: {
        fontSize: 20,
        padding: 10,
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


AppRegistry.registerComponent("DoubleButtonsComponent", () => DoubleButtonsComponent);