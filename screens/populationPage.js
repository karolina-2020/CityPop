import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import City from './cityPage.js'
import { LinearGradient } from 'expo'

export default function Population({ navigation }) {

  return (

    <View style={styles.container}>
      <View style={styles.picture}>
        <Image
          source={require('../assets/globe.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Text style={customTextProps.style}> {navigation.getParam('city').toUpperCase()}</Text>
      <View style={styles.borderClass}>
        <Text>POPULATION</Text>
        <Text> {navigation.getParam('population').toLocaleString()}</Text>
      </View>
    </View>
  );
}

const customTextProps = {
  style: {
    fontFamily: 'helvetica',
    fontSize: 20,
    padding: 20

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2bfdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    bprderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },

  borderClass: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    alignItems: 'center',

  },
  picture: {
    alignItems: 'center',
  },
});

