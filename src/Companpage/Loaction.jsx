import React,{useState} from "react";
import { GoogleMap, LoadScriptNext, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api"

function Loaction() {
    
    const [searchBox, setSearchBox] = useState();
    const [center, setCenter] = useState({ lat: 43.68, lng: -79.43 });
    const [selectedLocation, setSelectedLocation] = useState();

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
            }

        });
    };  

    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    const handlePlacesChanged = () => {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const newCenter = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            setCenter(newCenter);
        }
    };

  return (
    <div>
          <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{ height: "400px", width: "100%" }}
              onClick={handleMapClicked}
          >
              <StandaloneSearchBox
                  onLoad={handleSearchBoxLoad}
                  onPlacesChanged={handlePlacesChanged}
              >
                  <input
                      type="text"
                      placeholder="Search for a location"
                      style={{
                          boxSizing: "border-box",
                          border: "1px solid transparent",
                          width: "240px",
                          height: "32px",
                          padding: "0 12px",
                          borderRadius: "3px",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                          fontSize: "14px",
                          outline: "none",
                          textOverflow: "ellipses",
                          position: "absolute",
                          left: "50%",
                          marginLeft: "-120px",
                      }}
                  />
              </StandaloneSearchBox>
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
  )
}

export default Loaction