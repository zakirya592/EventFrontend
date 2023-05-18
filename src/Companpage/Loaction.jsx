import { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import axios from 'axios';

function Loaction() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    const openMap = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation([position.coords.latitude, position.coords.longitude]);
            console.log(position.coords.latitude, position.coords.longitude);
        });
    };

    const saveLocation = () => {
        // axios.post('/api/location', { location }).then(response => {

        // });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    console.log(position.coords.latitude);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
        console.log('dalhd');
    };

    // Save the geolocation data to a database or API
    useEffect(() => {
        if (latitude && longitude) {
            // Here, you can make an API request or perform any other data-saving operation
            // to store the latitude and longitude values
            saveGeolocationData(latitude, longitude);
        }
    }, [latitude, longitude]);

    // Function to save geolocation data
    const saveGeolocationData = (lat, lon) => {
        // Implement your logic to save the data to a database or API
        console.log('Saving geolocation data:', lat, lon);
        // You can make an API request or use any state management system to save the data
    };
  return (
    <div>
          <button onClick={openMap}>Select Location</button>
          {location && (
              <>
                  <MapContainer center={location} zoom={13}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={location} />
                  </MapContainer>
                  <button onClick={saveLocation}>Save Location</button>
              </>
          )}
          {latitude && longitude ? (
            <div>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
          ) : (
            <p>{error ? `Error: ${error}` : 'Fetching geolocation...'}</p>
          )}
    </div>
  )
}

export default Loaction