import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {Rating} from 'react-native-ratings';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import StaticFlatList from "../InlineComponents/StaticFlatList"

export default class SingleBookComponent extends Component{

  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent label='Title'/>
            <TextFieldComponent label='Author'/>
            <TextFieldComponent label='Publication Date'/>
            <TextFieldComponent label='Description'/>
            <StaticFlatList label='Tags' data={[
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
                ]} />
            <Rating
                type='heart'
                ratingCount={5}
                imageSize={60}
                style={styles.ratingStyle}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    ratingStyle: {
        paddingLeft: 50
    }
});


AppRegistry.registerComponent("SingleBookComponent", () => SingleBookComponent);