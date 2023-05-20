import React,{useState} from "react";
import { GoogleMap, LoadScriptNext, InfoWindow, Marker, StandaloneSearchBox } from "@react-google-maps/api"
import { Modal, Button, Form } from "react-bootstrap";


const mapOptions = {
    zoom: 12,
    center: {
        lat: 43.68,
        lng: -79.43,
    },
};
function Loaction() {
    const [searchBox, setSearchBox] = useState();
    const [center, setCenter] = useState({ lat: 43.68, lng: -79.43 });

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



    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [addresses, setAddresses] = useState("");

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
        // Use the Geocoder service to get the address based on latitude and longitude

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                setSelectedLocation({ latitude, longitude, address });
            }
        });
        // setSelectedLocation({ latitude, longitude, address });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with selectedLocation data
        console.log(selectedLocation);
        setShowModal(false);
    };

    const markerPosition = {
        lat: 43.68,
        lng: -79.43,
    };
  return (
    <div>
          <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{ height: "400px", width: "100%" }}
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
              <Marker position={markerPosition} />
          </GoogleMap>


          <button className='fs-6 py-3 w-100 loactiontak px-2 fw-bold bg-light border border-secondary loactioncolor' onClick={handleShowModal}>
              Pick your Location
          </button>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>Select Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <LoadScriptNext googleMapsApiKey="AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU" >
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
                                  address={selectedLocation.address}
                              >

                              </Marker>
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
                      <Button variant="primary" type="submit">
                          Save
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>
    </div>
  )
}

export default Loaction