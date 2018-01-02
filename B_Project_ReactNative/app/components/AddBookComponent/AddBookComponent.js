import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';

import TextFieldComponent from "../InlineComponents/TextFieldComponent"
import DoubleButtonsComponent from "../InlineComponents/DoubleButtonComponent"
import DynamicFlatListComponent from "../InlineComponents/DynamicFlatListComponent"

export default class AddBookComponent extends Component{
    constructor(props) {
        super(props);
        
        this.state = {bookId: '', title: '', author: '', publicationDate: '', description: '', tags: []};
    }

  addBookButtonClicked(){

  }

  tagBookButtonClicked(){

  }

  render(){
    return(
        <View style={styles.parentView}>
            <TextFieldComponent 
                label='Book ID' 
                initialText="" 
                editableInputType={true} 
                textUpdated={(text) => this.state.bookId = text}
            />
            <TextFieldComponent 
                label='Title' 
                initialText="" 
                editableInputType={true} 
                textUpdated={(text) => this.state.title = text}
            />
            <TextFieldComponent 
                label='Author' 
                initialText="" 
                editableInputType={true} 
                textUpdated={(text) => this.state.author = text}
            />
            <TextFieldComponent 
                label='Publication Date' 
                initialText="" 
                editableInputType={true} 
                textUpdated={(text) => this.state.publicationDate = text}
            />
            <TextFieldComponent 
                label='Description' 
                initialText="" 
                editableInputType={true} 
                textUpdated={(text) => this.state.description = text}
            />
            <DynamicFlatListComponent label='Tags' data={[
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
            />
            <DoubleButtonsComponent
                firstButtonLabel='Add Book'
                firstButtonClicked={() => this.addBookButtonClicked()}
                secondButtonLabel='Tag Book'
                secondButtonClicked={() => this.tagBookButtonClicked()}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});


AppRegistry.registerComponent("AddBookComponent", () => AddBookComponent);