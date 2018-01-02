import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {Rating} from 'react-native-ratings';

export default class SingleBookComponent extends Component{

  render(){
    return(
        <View style={styles.parentView}>
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
            </View>
            <Rating
                type='heart'
                ratingCount={3}
                imageSize={60}
                showRating
            />
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
    flatListViewStyle: {
        height: 171.83
    }
});


AppRegistry.registerComponent("SingleBookComponent", () => SingleBookComponent);