import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, button, TouchableOpacity, Image } from 'react-native';
import Icon from '../assets/search.png';
//import Loader from './Loader';

/*TODO: 
 * error handling: for example if no input
 * Add search icon 
 */

export default class Country extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.state = {
            country: null,
            countryCode: null,
            loading: false,
            textInput: ''
        };
    }

    // Async funtion to map the user input to a country code.

    async lookForCountryCode() {
        // Ugly way of clearing the text input, should be done when navigating back. 
        this.textInput.current.clear();

        try {
            this.setState({ loading: true })
            const url = "http://api.geonames.org/searchJSON?&username=weknowit&fcode=pcli&isNameRequired=true&adminCode1=00&name=" + this.country
            const response = await fetch(url);
            const data = await response.json();


            /* Throw error if no countries were found. */

            if (data.totalResultsCount == 0) {
                throw new Error();
            }
            /*
            for (var i = 0; i < data.geonames.length; i++) {

                if (data.geonames[i].countryName == this.country  && data.geonames[i].population != 0) {

                    this.searchForCountry(data.geonames[i].countryCode)
                    break;
                }
                
            }
            */

            this.searchForCountry(data.geonames[0].countryCode)

        } catch (error) {
            this.setState({ loading: false })
            alert("No country was found.")
            this.textInput.current.clear();
        }

    }

    // Async function to search for a country using its country code 

    async searchForCountry(countryCode) {
        this.setState({ loading: true })
        const url = "http://api.geonames.org/searchJSON?&username=weknowit&country=" + countryCode
        const response = await fetch(url);
        const data = await response.json();

        var cities = [];
        for (var i = 0; i < data.geonames.length; i++) {
            var fcode = data.geonames[i].fcode;

            // Filter only the cities, using the fcodes 

            if (fcode == "PPLC" || fcode == "PPLA" || fcode == "PPLA2" || fcode == "PPL") {
                cities.push(data.geonames[i]);
            }
        }

        this.lookForThreeBiggest(cities)
    }

    /* Function to sort cities according to size: biggest .. smallest. 
        Then take three biggest and navigate to three biggest page */

    lookForThreeBiggest(cities) {

        let sortedCities = new Array();

        for (var i = 0; i < cities.length; i++) {
            sortedCities.push([cities[i].name, cities[i].population]);
        }

        sortedCities.sort(function (a, b) {
            return b[1] - a[1]
        })


        const { navigate } = this.props.navigation;
        navigate('threeBiggest', {
            country: this.country,
            city1: sortedCities[0],
            city2: sortedCities[1],
            city3: sortedCities[2],
        })
        this.setState({ loading: false });

    }


    // Function to remove whitespaces, make first letter capitalized and the rest to lower case.

    reformat(str) {

        return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
    }


    render() {
        return (

            <View style={styles.container}>

                <View style={styles.picture}>
                    <Image
                        source={require('../assets/newglobe.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <Text style={customTextProps.style}>SEARCH BY COUNTRY</Text>
                <TextInput
                    ref={this.textInput}
                    style={styles.input}
                    placeholder='Enter a country'
                    onChangeText={(val) => this.country = this.reformat(val)}
                />
                <TouchableOpacity
                    onPress={() => this.lookForCountryCode()}>
                    <Image
                        source={require('../assets/newsearch.png')}
                        style={styles.roundButton}
                    />
                </TouchableOpacity>

                <Text /* Ugly solution to get some whitespace */> </Text>

                <ActivityIndicator margin='100' animating={this.state.loading} color='#000000' ></ActivityIndicator>
            </View>
        );
    }
}


const customTextProps = {
    style: {
        //fontFamily: 'Phosphate',
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
    picture: {
        alignItems: 'center',
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

