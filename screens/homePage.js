import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { setCustomText } from 'react-native-global-props';

export default function Home({ navigation }) {

  const customTextProps = {
    style: {
      //fontFamily: 'Phosphate',
      fontFamily: 'verdana',
      fontSize: 30,


    }
  }

  // Needed to render the picture correctly?
  const picture = require("../assets/globe.jpeg")

  //setCustomText(customTextProps);

  const pressHandlerCity = () => {
    navigation.navigate('cityPage')
  }

  const pressHandlerCountry = () => {
    navigation.navigate('countryPage')
  }

  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        <Image
          source={picture}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <Text style={customTextProps.style}>CityPop</Text>
      <View style={styles.borderClass}>
        <TouchableOpacity
          style={styles.button}
          onPress={pressHandlerCountry}
        >
          <Text> SEARCH BY COUNTRY </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borderClass}>
        <TouchableOpacity
          style={styles.button}
          onPress={pressHandlerCity}
        >

          <Text> SEARCH BY CITY </Text>
        </TouchableOpacity>
      </View>
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
    padding: 10,
  },

  picture: {
    alignItems: 'center',
  },

  borderClass: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5

  }

});
