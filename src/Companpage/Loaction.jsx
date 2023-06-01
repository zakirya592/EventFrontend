import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';


const mapOptions = {
    zoom: 10,
    center: { lat: 10, lng: 10 }, // Set initial center to (0, 0)
};
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

  return (
    <div>
         
       
          <div className="App">
              
              <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} options={mapOptions}>
                  {currentLocation && <Marker position={currentLocation} />}
              </GoogleMap>
          </div>

    </div>
  )
}

export default Loaction