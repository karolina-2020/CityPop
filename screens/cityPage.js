import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export default class City extends Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();

    this.state = {
      city: null,
      population: null,
      loading: false,
      textInput: '',

    };
  }

  // Async function to interract wit API and dynamically extract city and population from JSON array 

  async searchForCity() {

    // Ugly solution for clearing the text input, should probably rather be done when navigating back.
    this.textInput.current.clear();

    try {
      this.setState({ loading: true })

      /* Fetch from API with parameters: 
       - order by relevance
       - feature class "populated place"
       - name_equals. 
      If no results, or if the results weren't cities, throw error */


      const url = "http://api.geonames.org/searchJSON?&username=weknowit&orderby=relevance&fclass=p&name_equals=" + this.city
      const response = await fetch(url);
      const data = await response.json();

      if (data.totalResultsCount == 0) {
        throw new Error();
      }

      var cities = [];

      for (var i = 0; i < data.geonames.length; i++) {
        var fcode = data.geonames[i].fcode;

        // Filter the cities, using fcodes.

        if (fcode == 'PPLC' || fcode.startsWith('PPLA')) {
          cities.push(data.geonames[i]);
        }
      }

      if (cities.length == 0) {
        throw new Error();
      }

      // Take the city and population from the first element in the array.

      this.city = cities[0].name;
      this.population = cities[0].population;

      // Navigate to population page with city and population parameter.

      const { navigate } = this.props.navigation;
      navigate('populationPage', {
        city: this.city,
        population: this.population
      })
      this.setState({ loading: false });
    }



    catch (error) {
      this.setState({ loading: false })
      alert("Sorry, no city was found.");
      this.textInput.current.clear();

    }

  }

  // Function to remove whitespaces, and make first letter capitalized and the rest to lower case. 

  reformat(str) {

    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
  }


  render() {

    return (

      <View style={styles.container}>
        <View style={styles.picture}>
          <Image
            source={require('../assets/globe.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <Text style={customTextProps.style}>SEARCH BY CITY</Text>
        <TextInput
          ref={this.textInput}
          style={styles.input}
          placeholder='Enter a city'
          onChangeText={(val) => this.city = this.reformat(val)}
          onKeyPress={(event) => {
            if (event.nativeEvent.key == "Enter") {
              this.searchForCity();
            }
          }}

        />
        <TouchableOpacity
          onPress={() => this.searchForCity()}>
          <Image
            source={require('../assets/search.png')}
            style={styles.roundButton}
          />
        </TouchableOpacity>
        <Text /* Ugly solution to add some whitespace */ > </Text>
        <ActivityIndicator animating={this.state.loading} color='#000000'></ActivityIndicator>

      </View>
    );
  }
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
    borderColor: '#777',
    backgroundColor: '#ffff',
    padding: 8,
    margin: 10,
    width: 200,
  },
  roundButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    borderColor: '#000000',
    borderWidth: 1
  },
});

