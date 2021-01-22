import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, button, TouchableOpacity, Image } from 'react-native';





/************TODO: 
 * make first letter capitalized
 * error handling for example if no input
 * navigate to city page when rendered
 */
export default class Country extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: null,
            countryCode: null,
        };
    }






    goToCity = () => {
        alert("here we are")
        const { navigate } = this.props.navigation;
        navigate('cityPage')


    }


    async lookForCountryCode() {
        const url = "http://api.geonames.org/searchJSON?&username=weknowit&isNameRequired=true&name=" + this.country
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.geonames);
        var i = 0
        //alert(this.country)
        for (i = 0; i < data.geonames.length; i++) {
            if (data.geonames[i].countryName == this.country) {

                this.searchForCountry(data.geonames[i].countryCode)
                break;
            }


        }



    }

    async searchForCountry(countryCode) {
        const url = "http://api.geonames.org/searchJSON?&username=weknowit&country=" + countryCode
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.geonames);
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
                    onChangeText={(val) => this.country = val} //TODO: Format "Sweden"
                />
                <button onClick={() => this.lookForCountryCode() /*TODO: Indicate while loading*/}> GO </button >
                <button onClick={() => this.goToCity()}>Go to City Page"</button>
            </View>
        );
    }


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
