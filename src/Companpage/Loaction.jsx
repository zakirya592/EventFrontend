import React, { useState, useEffect } from 'react';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';

function Location() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchBox, setSearchBox] = useState(null);

    useEffect(() => {
        // Get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.log('Error getting current location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleMapLoaded = (map) => {
        setSearchBox(new window.google.maps.places.SearchBox(map.getDiv()));
    };

    const handlePlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                const newLocation = {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    address: place.formatted_address,
                };
                setSelectedLocation(newLocation);
            }
        }
    };

    const handleMapClicked = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                setSelectedLocation({ latitude, longitude, address });
            }
        });
    };

    return (
        <div>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={selectedLocation ? selectedLocation : currentLocation}
                zoom={10}
                onLoad={handleMapLoaded}
                onClick={handleMapClicked}
            >
                <StandaloneSearchBox onPlacesChanged={handlePlacesChanged}>
                    <input
                        type="text"
                        placeholder="Search for a location"
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '240px',
                            height: '32px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-120px',
                        }}
                    />
                </StandaloneSearchBox>

                {currentLocation && <Marker position={currentLocation} />}

                {selectedLocation && (
                    <Marker
                        position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                        address={selectedLocation.address}
                    />
                )}
            </GoogleMap>
        </div>
    );
}

export default Location;
