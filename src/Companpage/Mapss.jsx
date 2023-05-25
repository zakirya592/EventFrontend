import React, { useState ,useEffect} from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function Mapss() {
    // Design section 
    const [showModal, setShowModal] = useState(false);
    // Loaction section 
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
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
    const [currentLocation, setCurrentLocation] = useState(null);
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


    const [locationsapi, setlocationsapi] = useState([]);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        axios.get(`http://gs1ksa.org:3015/api/ListOFAllLocation`)
            .then((res) => {
                setlocationsapi(res.data.recordset);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
  return (

    <div>

        




                  <GoogleMap
                      mapContainerStyle={{ height: '400px', width: '100%' }}
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

                      {/* {selectedLocation && ( */}
                  { locationsapi.map((item, index) => (
                          <Marker
                              position={{
                              lat: parseFloat(item.lattitiude), // Ensure latitude is parsed as a float
                              lng: parseFloat(item.longitude),
                              }}
                              address={item.address}
                          label={{
                              text: `${item.lattitiude.toString()} , ${item.longitude}`,
                              color: 'orange',
                              className: 'marker-label d-flex', // Apply a CSS class for custom styling
                              fontSize: '16px', // Set the font size of the label
                              display: 'flex', // Apply flex display to the label
                          }} 
                          >

                          </Marker>
                  ))}
                      {/* )} */}
                  </GoogleMap>


    </div>
  )
}

export default Mapss