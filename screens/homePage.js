import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { setCustomText } from 'react-native-global-props';

export default function Home( {navigation}) {

  const customTextProps = { 
    style: { 
      fontFamily: 'verdana',
      fontSize: 25,
      
    }
  }

  setCustomText(customTextProps);

  const pressHandlerCity = () => {
    navigation.navigate('cityPage')
  } 

  return (
    <View style={styles.container}>
      <Text >CityPop</Text>
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
