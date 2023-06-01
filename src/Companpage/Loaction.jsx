import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import axios from "axios";



function Loaction() {
    
  
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

    const mapOptions = {
        zoom: 10,
        center: { currentLocation }, // Set initial center to (0, 0)
    };

    const [locationsapi, setlocationsapi] = useState([]);

  

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
    useEffect(() => {
        fetchLocations();
    }, []);
  return (
    <div>
         
       
          <div className="App">
              
              <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} options={mapOptions} center={currentLocation}>
                  {currentLocation && <Marker position={currentLocation} />}
                  {locationsapi.map((item, index) => (
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
              </GoogleMap>
          </div>

    </div>
  )
}

export default Loaction