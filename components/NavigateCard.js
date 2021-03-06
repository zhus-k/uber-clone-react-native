import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Select your destination</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    placeholder='To Where?'
                    debounce={400}
                    nearbyPlacesAPI='GooglePlacesSearch'
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
                    enablePoweredByContainer={false}
                    onPress={(data, details = null) => {
                        dispatch(
                            setDestination({
                                location: details.geometry.location,
                                description: data.description,
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
                />

                <NavFavourites />
            </View>

            <View
                style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon
                        name='car'
                        type='font-awesome'
                        color='white'
                        size={16}
                    />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`flex flex-row justify-between w-24 px-4 py-3`}
                >
                    <Icon
                        name='fast-food-outline'
                        type='ionicon'
                        color='black'
                        size={16}
                    />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard;

const styles = StyleSheet.create({});
