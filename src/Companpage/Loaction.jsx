import React,{useState,useEffect,useRef} from "react";
import { GoogleMap, LoadScriptNext, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api"
import { Modal, Button, Form } from "react-bootstrap";

function Loaction() {
    
    const [searchBox, setSearchBox] = useState();
    const [center, setCenter] = useState({ lat: 43.68, lng: -79.43 });
    const [selectedLocation, setSelectedLocation] = useState();
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState("");
    const [error, setError] = useState(null);

    const handleShowModal = () => {
        setShowModal(true);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with selectedLocation data
        console.log(selectedLocation);
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
                console.log(address, latitude, longitude);
                setCurrentLocation(null);
            }

        });
    };  

    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    const searchBoxRef = useRef(null);

    const handlePlacesChanged = () => {
        const searchBox = searchBoxRef.current;
        // const input = document.getElementById('search-input');
        // const searchBox = new window.google.maps.places.SearchBox(input);
        if (searchBox && searchBox.getPlaces) {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const newCenter = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            setCenter(newCenter);
        }
    }
    else{
        console.log("You can not get");
    }
        
    };
    
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
          <button className='fs-6 py-3 w-100 loactiontak px-2 fw-bold bg-light border border-secondary loactioncolor' onClick={handleShowModal}>
              Pick your Location
          </button>
          <div className=''>
              {selectedLocation && selectedLocation ? (
                  <span className='d-flex px-2'>
                      <div className="fs-6 mx-2 text-success">Address: {selectedLocation.address}</div>
                  </span>
              ) : (
                  <div className="fs-6 text-danger px-2">{error ? `Error: ${error}` : 'Fetching geolocation...'}</div>
              )}
          </div>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                  <Modal.Title>Select Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <GoogleMap
              center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : currentLocation}
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
                      id="search-input" 
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
                  <Form onSubmit={handleFormSubmit}>
                      <Form.Group controlId="formLatitude">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                              type="text"
                              value={selectedLocation ? selectedLocation.latitude : ""}
                          // readOnly
                          />
                      </Form.Group>
                      <Form.Group controlId="formLongitude">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                              type="text"
                              value={selectedLocation ? selectedLocation.longitude : ""}
                          // readOnly
                          />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                          Save
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>

          {selectedLocation ? <p>{localStorage.setItem('latitude', selectedLocation.latitude)}</p> : ""}
          {selectedLocation ? <p>{localStorage.setItem('longitude', selectedLocation.longitude)}</p> : ""}


    </div>
  )
}

export default Loaction