import { useState, useEffect, useRef } from "react";
import {
    GoogleMapsProvider, useGeocodingService,
    useGoogleMap, createGoogleMaps,
} from "@ubilabs/google-maps-react-hooks";
import { GoogleMap, LoadScriptNext, InfoWindow, Marker } from "@react-google-maps/api"

import { Modal, Button, Form } from "react-bootstrap";
import { usePlacesWidget } from "react-google-autocomplete";
// const google = window.google;
const mapOptions = {
    zoom: 12,
    center: {
        lat: 43.68,
        lng: -79.43,
    },
};



function Locationed() {
    const [lat, setLat] = useState(43.68);
    const [lng, setLng] = useState(-79.43);
    const { map } = useGoogleMap();
    const markerRef = useRef();

    useEffect(() => {
        if (!map || markerRef.current) return;
        markerRef.current = new window.google.maps.Marker({ map });
    }, [map]);

    useEffect(() => {
        if (!markerRef.current) return;
        if (!window.google || !window.google.maps) return;
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

 const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = {
        lat: 43.68,
        lng: -79.43,
    };
function Loaction() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const handleButtonClicked = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        // window.open(url);
        console.log(latitude);
    };
    const handleButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    };
    const [mapContainer, setMapContainer] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place);
    };

    const handleMapClick = (event) => {
        setSelectedPlace({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };
    



    // Second Loaction test
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMapClicked = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        setSelectedLocation({ latitude, longitude });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with selectedLocation data
        console.log(selectedLocation);
        setShowModal(false);
    };
  return (
    <div>
          <button onClick={handleButtonClick}>Get Geolocation</button>
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
          )}

          {/* <GoogleMapsProvider
              googleMapsAPIKey={process.env.AIzaSyDVCqqdXFDq8EjLgNI60Tge8lStQu4A6Sg}
              options={mapOptions}
              mapContainer={mapContainer}
          >
              <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
              <Locationed />
          </GoogleMapsProvider> */}
          
          <LoadScriptNext googleMapsApiKey="AIzaSyDVCqqdXFDq8EjLgNI60Tge8lStQu4A6Sg">
              <usePlacesWidget 
                  onLoad={(autocomplete) => {
                      autocomplete.addListener("place_changed", () => {
                          const place = autocomplete.getPlace();
                          handlePlaceSelect(place);
                      });
                  }}
              >
                  <input type="text" placeholder="Enter a location" />
              </usePlacesWidget>

              <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedPlace ? selectedPlace.geometry.location : center}
                  zoom={12}
                  onClick={handleMapClick}
              >
                  {selectedPlace && (
                      <Marker position={selectedPlace.geometry.location} />
                  )}
              </GoogleMap>
          </LoadScriptNext>

          <Button variant="primary" onClick={handleShowModal}>
              Pick Location
          </Button>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>Select Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <LoadScriptNext googleMapsApiKey="AIzaSyDVCqqdXFDq8EjLgNI60Tge8lStQu4A6Sg">
                      <GoogleMap
                          mapContainerStyle={{ height: "400px" }}
                          options={mapOptions}
                          onClick={handleMapClicked}
                      >
                          {selectedLocation && (
                              <Marker
                                  position={{
                                      lat: selectedLocation.latitude,
                                      lng: selectedLocation.longitude,
                                  }}
                              />
                          )}
                      </GoogleMap>
                  </LoadScriptNext>
                  {selectedLocation && (
                      <InfoWindow
                          position={{
                              lat: selectedLocation.latitude,
                              lng: selectedLocation.longitude,
                          }}
                      >
                          <div>
                              Latitude: {selectedLocation.latitude}
                              <br />
                              Longitude: {selectedLocation.longitude}
                          </div>
                      </InfoWindow>
                  )}
                  <Form onSubmit={handleFormSubmit}>
                      <Form.Group controlId="formLatitude">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                              type="text"
                              value={selectedLocation ? selectedLocation.latitude : ""}
                              readOnly
                          />
                      </Form.Group>
                      <Form.Group controlId="formLongitude">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                              type="text"
                              value={selectedLocation ? selectedLocation.longitude : ""}
                              readOnly
                          />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Save
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>
          {selectedLocation ? <p>{selectedLocation.latitude}</p>: ""}
          {selectedLocation ? <p>{selectedLocation.longitude}</p> : ""}
    </div>
  )
}

export default Loaction