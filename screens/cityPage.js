import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

export default class City extends Component {

  constructor(props) {
    super(props);

    this.state = {
      city: null,
      population: null
    };
  }



  /*
   * TOD0:
   * make first letter capitalized
   * error handling: for example if no input
   */


   /* Asyncronous funtion to interract wit API and dynamically extract city and population from JSON array */
  
   async searchForCity() {
    const url = "http://api.geonames.org/searchJSON?&username=weknowit&q=" + this.city
    const response = await fetch(url);
    const data = await response.json();
    this.population = data.geonames[0].population

/* Navigate to population page with city and population parameter */

    const { navigate } = this.props.navigation;
    navigate('populationPage', {
      city: this.city,
      population: this.population
    })


  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('../assets/globe.jpeg')}
          style={{ width: 100, height: 100 }}
        />
        <Text style={customTextProps.style}>SEARCH BY CITY</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter a city'
          onChangeText={(val) => this.city = (val)}
        />
        <button onClick={() => this.searchForCity()}> GO </button>
      </View>
    );
  }
}

const customTextProps = {
  style: {
    fontFamily: 'verdana',
    fontSize: 20,

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

