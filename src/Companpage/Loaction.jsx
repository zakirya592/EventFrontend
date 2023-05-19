import { useState, useEffect, useRef } from "react";
import {
    GoogleMapsProvider, useGeocodingService,
    useGoogleMap, createGoogleMaps
} from "@ubilabs/google-maps-react-hooks";

// const google = window.google;

const mapOptions = {
    zoom: 12,
    center: {
        lat: 43.68,
        lng: -79.43,
    },
};
function Loaction() {
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    // const handleButtonClicked = () => {
    //     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    //     // window.open(url);
    //     console.log(url);
    // };
    // const handleButtonClick = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 setLatitude(latitude);
    //                 setLongitude(longitude);
    //             },
    //             (error) => {
    //                 console.error('Error getting geolocation:', error);
    //             }
    //         );
    //     } else {
    //         console.error('Geolocation is not supported by your browser.');
    //     }
    // };
    const [mapContainer, setMapContainer] = useState(null);

    
  return (
    <div>
          {/* <button onClick={handleButtonClick}>Get Geolocation</button>
          {latitude && longitude && (
            <>
              <LoadScriptNext
                  googleMapsApiKey="AIzaSyATo4qkSgopaEkIfyD2SjtQJSkY3wrJiPYs"
              >
                  <GoogleMap
                      defaultZoom={8}
                        mapContainerStyle={{ height: '200px', width: '100%' }}
                      defaultCenter={{ lat: latitude, lng: longitude }}
                  >
                      <Marker position={{ lat: latitude, lng: longitude }} />
                  </GoogleMap>
              </LoadScriptNext>
                  <button onClick={handleButtonClicked}>Open Google Maps</button>
              </>
          )} */}
          <GoogleMapsProvider
              googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
              options={mapOptions}
              mapContainer={mapContainer}
          >
              <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
              <Locationed />
          </GoogleMapsProvider>
          
    </div>
  )
}

export default Loaction


function Locationed() {
    const [lat, setLat] = useState(43.68);
    const [lng, setLng] = useState(-79.43);
    const { map } = useGoogleMap();
    const markerRef = useRef();

    useEffect(() => {
        if (!map || markerRef.current) return;
        // Ensure the 'google' object is available
        const { google } = window;
        markerRef.current = new google.maps.Marker({ map });
    }, [map]);

    useEffect(() => {
        if (!markerRef.current) return;
        // Ensure the 'google' object is available
        // const { google } = window;
        // if (!google || !google.maps) return;
        if (isNaN(lat) || isNaN(lng)) return;
        markerRef.current.setPosition({ lat, lng });
        map.panTo({ lat, lng });
    }, [lat, lng, map]);

    return (
        <div className="lat-lng">
            <input
                type="number"
                value={lat}
                onChange={(event) => setLat(parseFloat(event.target.value))}
                step={0.01}
            />
            <input
                type="number"
                value={lng}
                onChange={(event) => setLng(parseFloat(event.target.value))}
                step={0.01}
            />
        </div>
    );
}