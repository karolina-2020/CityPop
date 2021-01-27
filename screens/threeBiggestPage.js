import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function threeBiggest({ navigation }) {

  const city1 = navigation.getParam('city1');
  const city2 = navigation.getParam('city2');
  const city3 = navigation.getParam('city3');


  /* TODO:
  /* Navigate when clicking on cities.
  */

  
  /* Constant to handle click from city buttons. Different props are sent as argument depending on which button is clicked. 
     Navigating to corresponding city page with city and population as parameter */

  const pressHandlerPopulation = (props) => {
    navigation.navigate('populationPage', {
      city: props[0],
      population: props[1]
    })
  }


  return (

    <View style={styles.container}>

      <Image
        source={require('../assets/globe.jpeg')}
        style={{ width: 100, height: 100 }}
      />

      <View style={styles.borderClass}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pressHandlerPopulation(city1)}
        >

          <Text> {city1[0].toUpperCase()} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderClass}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pressHandlerPopulation(city2)}
        >

          <Text> {city2[0].toUpperCase()} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderClass}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pressHandlerPopulation(city3)}
        >

          <Text> {city3[0].toUpperCase()} </Text>
        </TouchableOpacity>
      </View>


    </View>
  );



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
  button: {
    alignItems: 'center',
    color: '#fff',
    padding: 10,
  },

  borderClass: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5

  }

});

