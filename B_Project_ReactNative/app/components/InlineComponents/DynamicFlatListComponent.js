import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';


export default class DynamicFlatListComponent extends Component{

  constructor(props) {
    super(props);
    
    this.state = {newTag: '', model: []};
    console.log("constructor");
  }

  addTag(){
      let tag = this.state.newTag;
      let model = this.state.model;

      for(let i = 0; i < model.length; ++i){
          if(JSON.stringify({key:tag}) === JSON.stringify(model[i])){
              return;
          } 
      }
      
      model.push({key:tag});
      console.log("MODEL");
      this.setState({...this.state, model:model});

      this.props.newItemCallback({key:tag});
  }


  render(){
    return(
        <View>
            <View style={styles.inlineView}>
                <Text style={styles.textView}>{this.props.label}: </Text>
                <TextInput
                        style={styles.textField}
                        placeholder=""
                        onChangeText={(text) => this.setState({...this.state, newTag:text})}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.addTag()}
                >
                    <Text style={styles.buttonTextStyle}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatListViewStyle}
                data={this.state.model}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                extraData={this.state}
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