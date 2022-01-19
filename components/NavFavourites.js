import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: '123',
        icon: 'home',
        label: 'Home',
        location: {
            "lat": 43.653226,
            "lng": -79.3831843,
        },
        description: 'Toronto, ON, Canada',
    },
    {
        id: '456',
        icon: 'briefcase',
        label: 'Work',
        location: {
            "lat": 43.7756009,
            "lng": -79.2578552,
        },
        description: 'Scarborough Town Centre, Borough Drive, Scarborough, ON, Canada',
    }
]

const NavFavourites = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={
                () =>
                    <View
                        style={[
                            tw`bg-gray-200`,
                            { height: 0.5 }
                        ]}
                    />
            }
            renderItem={
                ({ item: { location, description, icon, label }, item }) =>
                    <TouchableOpacity style={tw`flex-row items-center p-5`}
                        onPress={() => {
                            console.log(navigation.getState());
                            if (navigation.getState().routes[0].name == 'HomeScreen') {
                                dispatch(
                                    setOrigin({
                                        location: location,
                                        description: description,
                                    })
                                );
                                dispatch(
                                    setDestination(null)
                                );
                            }
                            else if (navigation.getState().routes[0].name == 'NavigateCard') {
                                dispatch(
                                    setDestination({
                                        location: location,
                                        description: description,
                                    })
                                );
                                navigation.navigate('RideOptionsCard');
                            }
                        }}
                    >
                        <Icon
                            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                            name={icon}
                            type='ionicon'
                            color='white'
                            size={18}
                        />
                        <View>
                            <Text style={tw`font-semibold text-lg`}>{label}</Text>
                            <Text style={tw`text-gray-500`}>{description}</Text>
                        </View>
                    </TouchableOpacity>
            }
        />
    )
}

export default NavFavourites;

const styles = StyleSheet.create({});
