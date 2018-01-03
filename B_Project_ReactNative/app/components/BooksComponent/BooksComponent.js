import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, FlatList, Text} from 'react-native';
import {Rating} from 'react-native-ratings';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"

export default class BooksComponent extends Component{

  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent label='Title'/>
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
                    {key: 'Julie'}]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    flatListViewStyle: {
        height:400,
        paddingLeft: 20,
        width: 350
    },
});


AppRegistry.registerComponent("BooksComponent", () => BooksComponent);