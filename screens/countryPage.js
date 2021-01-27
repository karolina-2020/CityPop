import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, button, TouchableOpacity, Image } from 'react-native';
import Icon from '../assets/search.png';

/*TODO: 
 * error handling: for example if no input
 * Add search icon 
 * Indicate while loading
 * Erase earlier user input
 */

export default class Country extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: null,
            countryCode: null,
        };
    }

    /* Async funtion to map the user input to a country code */

    async lookForCountryCode() {
        try {
            const url = "http://api.geonames.org/searchJSON?&username=weknowit&fcode=pcli&isNameRequired=true&adminCode1=00&name=" + this.country 
            const response = await fetch(url);
            const data = await response.json();

            /* Throw error if no countries were found */
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
            alert("No country was found.")
        }

    }

    /* Async function to search for a country using its country code */

    async searchForCountry(countryCode) {
        const url = "http://api.geonames.org/searchJSON?&username=weknowit&country=" + countryCode
        const response = await fetch(url);
        const data = await response.json();
        var cities = [];
        for (var i = 0; i < data.geonames.length; i++) {
            var fcode = data.geonames[i].fcode;

            /* extract only the cities, using the fcodes */

            if (fcode == "PPLC" || fcode == "PPLA" || fcode == "PPLA2" || fcode == "PPL") {
                cities.push(data.geonames[i]);
            }
        }

        this.lookForThreeBiggest(cities)
    }

    /* Function to sort cities according to size: biggest .. smallest. Then take three biggest and navigate to three biggest page */

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
                <Text style={customTextProps.style}>SEARCH BY COUNTRY</Text>
                <TextInput

                    style={styles.input}
                    placeholder='Enter a country'
                    onChangeText={(val) => this.country = this.reformat(val)}
                />
                <button onClick={() => this.lookForCountryCode()} /*TODO: Indicate while loading*/> GO</button >

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

