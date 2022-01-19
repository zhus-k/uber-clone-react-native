import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_API_KEY } from '@env'
import MapViewDirections from 'react-native-maps-directions';
import tw from 'twrnc';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(
            [
                'origin',
                'destination',
            ],
            {
                edgePadding: {
                    top: 100,
                    right: 100,
                    bottom: 100,
                    left: 100,
                }
            }
        );

    }, [origin, destination]); // if origin or destination are changed, useEffect triggers

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                })
        }

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_API_KEY]);

    return (
        <MapView
            ref={mapRef} // bind ref to mapRef
            style={tw`flex-1`}
            mapType={"mutedStandard"}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
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
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            }
            {
                destination?.location && <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title='Destination'
                    description={destination.description}
                    identifier='destination'
                />
            }
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({});