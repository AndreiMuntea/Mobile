import React, {Component} from 'react';
import {AppRegistry, Text, View, FlatList, StyleSheet} from 'react-native';


export default class StaticFlatList extends Component{
  render(){
    return(
        <View style={styles.inlineView}>
            <Text style={styles.textView}>{this.props.label}: </Text>
            <FlatList
                style={styles.flatListViewStyle}
                data={this.props.data}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
    flatListViewStyle: {
        height: 261.83
    },
    inlineView: {
        flexDirection: 'row',
        padding: 10
    }
});


AppRegistry.registerComponent("StaticFlatList", () => StaticFlatList);