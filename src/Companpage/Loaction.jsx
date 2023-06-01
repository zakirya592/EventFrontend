import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import axios from "axios";



function Loaction() {
    
const [currentLocation, setCurrentLocation] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [searchBox, setSearchBox] = useState();

    const mapOptions = {
        zoom: 10,
        center: currentLocation ? currentLocation : { lat: 0, lng: 0 },
 // Set initial center to (0, 0)
    };


    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
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
    // Current Loaction
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

    const handleMapClicked = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        // Use the Geocoder service to get the address based on latitude and longitude

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;

                setSelectedLocation({ latitude, longitude, address });
                console.log(address, latitude, longitude);
                setCurrentLocation(null);
            }

        });
    };

  
  return (
    <div>
         
       
          <div className="App">
               <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px' }} 
            center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : currentLocation}
            zoom={10}
            onClick={handleMapClicked}
          >
            <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
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
                position={{
                  lat: selectedLocation.latitude,
                  lng: selectedLocation.longitude,
                }}
                address={selectedLocation.address}
              >

              </Marker>
            )}
          </GoogleMap>
          </div>

    </div>
  )
}

export default Loaction