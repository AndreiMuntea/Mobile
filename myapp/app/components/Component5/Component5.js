import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet} from 'react-native';

export default class Component5 extends Component{
  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state ={
      moviesDataSource: ds,
    }
  }

  componentDidMount(){
    this.fetchMovies();
  }

  fetchMovies(){
    fetch('http://10.0.2.2:3000/movies')
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          moviesDataSource: this.state.moviesDataSource.cloneWithRows(response)
        })
      });
  }

  renderRow(movie, sectionId, rowId, highlightRow){
    return(
      <View style={styles.row}>
        <Text style={styles.rowText}>{movie.name} - {movie.year}</Text>
      </View>
    );
  }


  render(){
    return(
      <ListView
        dataSource={this.state.moviesDataSource}
        renderRow={this.renderRow.bind(this)}
      >
      </ListView>
    );
  }
}
const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'center',
    padding:10,
    backgroundColor:'#f4f4f4',
    marginBottom:3
  },
  rowText:{
    flex:1
  }
})



AppRegistry.registerComponent('Component5', () => Component5);
