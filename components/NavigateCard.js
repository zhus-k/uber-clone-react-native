import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text
                style={tw`text-center py-5 text-xl`}
            >
                Yo
            </Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    placeholder='To Where?'
                    debounce={400}
                    nearbyPlacesAPI={GooglePlacesSearch}
                    styles={{
                        container: {
                            backgroundColor: 'white',
                            paddingTop: 20,
                            flex: 0,
                        },
                        textInput: {
                            backgroundColor: '#dddddf',
                            borderRadius: 0,
                            fontSize: 18,
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                            paddingVertical: 0,
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en'
                    }}
                    fetchDetails={true}
                    returnKey={'search'}
                    minLength={2}
                    enablePoweredByContainer={false``}
                    onPress={(data, details = null) => {
                        dispatch(
                            setDestination({
                                location: details.geometry.location,
                                destination: data.description
                            })
                        )
                        navigation.navigate('RideOptionsCard');
                    }}
                    requestUrl={{
                        useOnPlatform: 'web', // or "all"
                        url:
                            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                        headers: {
                            Authorization: `an auth token`, // if required for your proxy
                        },
                    }}
                >

                </GooglePlacesAutocomplete>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard;

const styles = StyleSheet.create({});
