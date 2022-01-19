import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={styles.container}>

                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={{ uri: 'https://links.papareact.com/gzs' }}
                />

                <GooglePlacesAutocomplete
                    placeholder='From where?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en'
                    }}
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        );
                        dispatch(
                            setDestination(null)
                        );
                    }}
                    listViewDisplayed='auto'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    enablePoweredByContainer={false}
                    minLength={2}
                    fetchDetails={true}
                    requestUrl={{
                        useOnPlatform: 'web', // or "all"
                        url:
                            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                        headers: {
                            Authorization: `an auth token`, // if required for your proxy
                        },
                    }}
                />

                <NavOptions />

                <NavFavourites />

            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        padding: 10,
    },
});