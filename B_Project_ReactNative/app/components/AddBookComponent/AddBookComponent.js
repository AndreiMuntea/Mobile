import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';


export default class AddBookComponent extends Component{

  render(){
    return(
        <View style={styles.parentView}>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Book ID: </Text>
                <TextInput
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Title: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Author: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Publication Date: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Description: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
            </View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>Tags: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    placeholder=""
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonTextStyle}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatListViewStyle}
                data={[
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
            <View style={styles.inlineView}>

                <TouchableOpacity
                    style={styles.bottomButtonStyle}
                >
                    <Text style={styles.textView}>Add Book</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bottomButtonStyle}
                >
                    <Text style={styles.textView}>Tag Book</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inlineView: {
        flexDirection: 'row',
        padding: 10
    },
    textView: {
        fontSize: 20,
        padding: 10,
        width:200
    },
    textField: {
        fontSize: 14,
        flex: 0.89
    },
    buttonStyle:{
        paddingTop: 10,
        paddingLeft: 7.5,
        paddingRight: 7.5,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        flex: 0.2
    },
    buttonTextStyle: {
        fontSize: 22
    },
    bottomButtonStyle:{
        alignItems: 'center',
        paddingLeft: 90,
        backgroundColor: '#DDDDDD',
        flex: 0.5,
        marginRight: 10,
        marginLeft: 10
    },
    flatListViewStyle: {
        height: 171.83,
        paddingLeft: 217.2
    }
});


AppRegistry.registerComponent("AddBookComponent", () => AddBookComponent);