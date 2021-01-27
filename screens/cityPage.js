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



  /*TODO: 
   * error handling: for example if no input
   * Add search icon 
   * Indicate while loading
   * Erase earlier user input
   */


  /* Asyncronous funtion to interract wit API and dynamically extract city and population from JSON array */

  async searchForCity() {
    try {
      const url = "http://api.geonames.org/searchJSON?&username=weknowit&isNameRequired=true&q=" + this.city
      const response = await fetch(url);
      const data = await response.json();

      /* If no results, throw error */

      if (data.totalResultsCount == 0) {
        throw new Error();
      }
      for (var i = 0; i < data.geonames.length; i++) {
        if (data.geonames[i].name == this.city) {
          this.population = data.geonames[i].population,
            this.city = data.geonames[i].name

          /* Navigate to population page with city and population parameter */

          const { navigate } = this.props.navigation;
          navigate('populationPage', {
            city: this.city,
            population: this.population
          })
        }
        break;
      }




    } catch (error) {
      alert("Sorry, no city was found.");
    }

  }





  /* Function to remove whitespaces, and make first letter capitalized, the rest to lower case. */

  reformat(str) {

    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
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
          onChangeText={(val) => this.city = this.reformat(val)}
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

