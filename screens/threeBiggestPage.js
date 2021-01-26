import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
//import City from './cityPage.js'

export default function threeBiggest ({navigation}){
    /*TODO:
    *Navigate when clicking on cities.
    */
    return(

    <View style={styles.container}>

      <Image
        source = {require ('../assets/globe.jpeg')}
        style={{width: 100, height: 100}}
      />
     <Text style = {customTextProps.style}>{navigation.getParam('city1')}</Text>
     <Text style = {customTextProps.style}>{navigation.getParam('city2')}</Text>
     <Text style = {customTextProps.style}>{navigation.getParam('city3')}</Text>
    
    
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
  input: {
    borderWidth: 1,
    bprderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  }
});

