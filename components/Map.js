import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    return (
        <MapView
            style={tw`flex-1`}
            mapType={"mutedStandard"}
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {
                origin?.location && <Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            }
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({});