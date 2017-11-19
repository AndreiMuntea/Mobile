import React, {Component} from 'react';
import {AppRegistry, Text, View, ScrollView} from 'react-native';

import Component1 from './app/components/Component1/Component1';
import Component2 from './app/components/Component2/Component2';
import Component3 from './app/components/Component3/Component3';
import Component4 from './app/components/Component4/Component4';
import Component5 from './app/components/Component5/Component5';

export default class MyApp extends Component{
  render(){
    return(
      <ScrollView>
        <Component1></Component1>
        <Component2></Component2>
        <Component3></Component3>
        <Component4></Component4>
        <Text>
          ------------ Fetch from local server ------------
        </Text>
        <Component5></Component5>
      </ScrollView>
    );
  }
}


AppRegistry.registerComponent('MyApp', () => MyApp);
