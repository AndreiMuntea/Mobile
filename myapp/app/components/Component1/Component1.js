import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Component1 extends Component{
  constructor(props){
      super(props);
      this.state = {
        name: 'Andrei',
        showName: false,
        message: this.props.message
      }
  }

  static defaultProps = {
    message: 'Hi there!'
  }

  render(){
    console.log("Hello debug");
    let name = this.state.showName ? this.state.name : 'No Name';

    return(
      <View>
        <Text>{this.state.message}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('Component1', () => Component1);
