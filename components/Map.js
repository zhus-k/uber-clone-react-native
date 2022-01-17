import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../slices/navSlice';
import { GOOGLE_MAPS_API_KEY } from '@env'
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(
            [
                'origin',
                'destination',
            ],
            {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                }
            }
        );

    }, [origin, destination]); // if origin or destination are changed, useEffect triggers

    return (
        <MapView
            ref={mapRef} // bind ref to mapRef
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
                origin && destination && <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            }
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