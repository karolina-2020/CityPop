import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, button } from 'react-native';

export default class City extends Component{

    constructor(props) {
        super(props);
     
        this.state = {
          city: null,
        };
      }



    /*****
     * TOD0:
     * Add error handling
     * add icon
     * */

    async searchForCity()
    {
        const url = "http://api.geonames.org/searchJSON?&username=weknowit&q=" + this.city
        const response = await fetch (url);
        const data = await response.json();
          console.log(data.geonames[0].population);
          alert(this.city.toLocaleUpperCase() + "\n"+  "POPULATION"  + "\n"+ data.geonames[0].population)
         
    }
  
    render() {
    return (
    <View style={styles.container}>
     <Text style = {customTextProps.style}>SEARCH BY CITY</Text>
    <TextInput 
      style = {styles.input} 
      placeholder='Enter a city'
      onChangeText = {(val) => this.city = (val)}
      />
      <button onClick= {()=> this.searchForCity()}> GO </button>
    </View>
  );
}
}

const customTextProps = { 
    style: { 
      fontFamily: 'verdana',
      fontSize: 25,
    
    }
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    bprderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  }
});

