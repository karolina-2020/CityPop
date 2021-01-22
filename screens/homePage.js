import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { setCustomText } from 'react-native-global-props';

export default function Home({ navigation }) {

  const customTextProps = {
    style: {
      fontFamily: 'verdana',
      fontSize: 25,

    }
  }

  const picture = require("../assets/globe.jpeg")

  setCustomText(customTextProps);

  const pressHandlerCity = () => {
    navigation.navigate('cityPage')
  }
  const pressHandlerCountry = () => {
    navigation.navigate('countryPage')
  }

  return (
    <View style={styles.container}>
      <Image
        source={picture}
        style={{ width: 100, height: 100 }}


      />
      <Text >CityPop</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={pressHandlerCountry}
      >
        <Text> SEARCH BY COUNTRY </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={pressHandlerCity}
      >
        <Text> SEARCH BY CITY </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'verdana'
  },
  button: {
    alignItems: 'center',
    color: '#fff',
    padding: 10
  }
});
