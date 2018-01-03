import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';


export default class DynamicFlatListComponent extends Component{
  render(){
    return(
        <View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>{this.props.label}: </Text>
                <TextInput
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
    textField: {
        fontSize: 14,
        flex: 0.89
    },
    flatListViewStyle: {
        height: 101.83,
        paddingLeft: 160.2
    },
    inlineView: {
        flexDirection: 'row',
        padding: 10
    },
    buttonTextStyle: {
        fontSize: 22
    },
    buttonStyle:{
        paddingTop: 10,
        paddingLeft: 7.5,
        paddingRight: 7.5,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        flex: 0.2
    },
});


AppRegistry.registerComponent("DynamicFlatListComponent", () => DynamicFlatListComponent);