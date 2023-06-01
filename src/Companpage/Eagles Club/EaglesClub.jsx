import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import { GoogleApiWrapper, } from "google-maps-react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';

// import dotenv from "dotenv";
// import env from "../../../.env"

const style = {
    width: '95%',
    height: '80%'
}
const containerStyle = {
    // position: 'relative',
    width: '95%',
    height: '80%'
}

const drawerWidth = 220

function EaglesClub({ google }) {
 
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


    // Loaction section 
    const [selectedLocation, setSelectedLocation] = useState();
    const [searchBox, setSearchBox] = useState(null);
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
        // setSearchBox(new window.google.maps.places.SearchBox(map.getDiv()));

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
        const apiKey = process.env;
        console.log(apiKey);
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
        <div className=''>
            <Box sx={{ display: 'flex' }}>
                <Sidebard />
                <AppBar
                    className='fortrans'
                    position='fixed'
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                ></AppBar>
                <Box
                    className=''
                    sx={{
                        flexGrow: 1,
                        my: 5,
                        mx: 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <div className="container mx-3 mt-5" style={{ width: "100%" }}>


                        <GoogleMap
                            google={window.google}
                            mapContainerStyle={{ height: '400px', width: '110%', }}
                            center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : currentLocation}
                            // options={{ disableDefaultUI: true }}
                            zoom={10}
                            onClick={handleMapClicked}
                            onLoad={handleSearchBoxLoad}
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

                            {locationsapi.map((item, index) => (
                                <Marker
                                key={index}
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

                            
                        </GoogleMap>

                    </div>

                </Box>
            </Box>

        </div >
    )
}

// export default  GoogleApiWrapper({
//     apiKey: `${ process.env.REACT_APP_MAP_KEY }`,
// })(EaglesClub)

export default EaglesClub