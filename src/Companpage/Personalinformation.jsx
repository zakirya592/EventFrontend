import React ,{useState,useEffect} from 'react';
import "./Personal.css";
import axios from 'axios'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom";
import Item from 'antd/es/list/Item';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {
  GoogleMapsProvider, useGeocodingService,
  useGoogleMap, createGoogleMaps,
} from "@ubilabs/google-maps-react-hooks";
import  Autocomplete from 'react-google-autocomplete';
import { GoogleMap, LoadScriptNext, InfoWindow, Marker, StandaloneSearchBox } from "@react-google-maps/api"
import { Modal, Button, Form } from "react-bootstrap";
import Loaction from './Loaction';
// import { ChatState } from '../CreateContext';
function Personalinformation() {
    const navigate = useNavigate();
    const personalna=()=>{
      navigate("/Personalinformation");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }

  const mapOptions = {
    zoom: 12,
    center: {
      lat: 43.68,
      lng: -79.43,
    },
  };
  const [passwordShown, setPasswordShown] = useState(false)
  const [first_name, setfirst_name] = useState()
  const [last_name, setlast_name] = useState('')
  const [street_address, setstreet_address] = useState('')
  const [barangay, setbarangay] = useState('')
  const [province, setprovince] = useState('')
  const [city, setcity] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [DropDownProvince, setDropDownProvince] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/ListOfDropDownProvince`)
            .then((res) => {
              setDropDownProvince(res.data.recordset);
              // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);

   const [DropDownCities, setDropDownCities] = useState([])
  const Cityget = () => {
    axios.get(`http://gs1ksa.org:3015/api/ListOfDropDownCities`)
      .then((res) => {
        setDropDownCities(res.data.recordset);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Cityget();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

const geolocationset=()=>{
  // Fetch geolocation when the component mounts
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
}
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    geolocationset(e.target.value)
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

  const [searchBoxauto, setSearchBoxauto] = useState();
  const [center, setCenter] = useState({ lat: 43.68, lng: -79.43 });

  const handleSearchBoxLoad = (ref) => {
    setSearchBoxauto(ref);
  };

  const handlePlacesChanged = () => {
    const places = searchBoxauto.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        // lat: selectedLocation.place.geometry.location.lat(),
        // lng: selectedLocation.place.geometry.location.lng(),
        
      };
      setCenter(newCenter);
    }
  };
  return (
    <>
<div className='Backgroundimgsection'>s</div>
      <div className="px-3 text-start">
              <button type="button" className=" btnnexttop px-5 mt-4 py-3" onClick={personalna}>PERSONAL INFORMATION</button>
              <button type="button" className=" btnnexttopnacactive  ms-3 px-5 mt-4 py-3" onClick={Detailnagation}>TFOE-PE DETAILS</button>
              
           <div className="row  p-2 mx-auto formsection">

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="FirstName" className="form-label labeinput">Email*</label>
              <input  className="form-control inputsection py-3" id="FirstName" placeholder='Enter your Email' aria-describedby="emailHelp" 
                types='email'
                                value={email}
                                onChange={e => {
                                    setemail(e.target.value)
                                  sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 position-relative">
                          <label htmlFor="password" className="form-label labeinput">Password*</label>
              <input className="form-control inputsection py-3" type={passwordShown ? 'text' : 'password'}
                id='password'
                placeholder='*********'
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value)
                  sessionStorage.setItem("password", e.target.value);

                }}
                required
                />
                 <p
                                className='position-absolute text-end showpassiconss '
                                onClick={()=>{ setPasswordShown(!passwordShown)}}
                            >
                                {passwordShown ? <EyeOutlined /> :<EyeInvisibleOutlined />}
                            </p>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="FirstName" className="form-label labeinput">First Name*</label>
              <input type="text" className="form-control inputsection py-3" id="FirstName" placeholder='Enter your First Name' aria-describedby="emailHelp" value={first_name}
                onChange={(event) => {
                  setfirst_name(event.target.value)
                  sessionStorage.setItem("item_key", event.target.value);
                }} />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="LastName" className="form-label labeinput">Last Name*</label>
              <input type="text" className="form-control inputsection py-3" id="LastName" aria-describedby="emailHelp" placeholder='Enter your Last Name' value={last_name}
                onChange={(event) => {
                  setlast_name(event.target.value)
                  sessionStorage.setItem("last_name", event.target.value);
                }}
                />
                  </div>
                </div>

                <div className="col-12 mt-3">
                      <div className="mb-3">
                      <label htmlFor="addrass" className="form-label labeinput">Street Address*</label>
                 <div>
                <textarea className="form-control inputsection" id="addrass" placeholder='Enter your Street Address ' value={street_address}
                  onChange={(event) => {
                    setstreet_address(event.target.value)
                    sessionStorage.setItem("street_address", event.target.value);
                  }} ></textarea>
                    </div> 
                  </div>
                </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGrid" className="form-label labeinput">Barangay*</label>
                      <select className="form-select inputsection py-3"  id="floatingSelectGrid" aria-label="Floating label select example" value={barangay}
                                  onChange={(event) => {
                                    setbarangay(event.target.value)
                                    sessionStorage.setItem("barangay", event.target.value);
                                  }}>
                          <option selected >Enter/Select Barangay</option>
                          <option value={"First"}>One</option>
                          <option value={"Second"}>Two</option>
                          <option value={"three"}>Three</option>
                      </select>
                      </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGrid2" className="form-label labeinput">Province*</label>
                      <select className="form-select inputsection py-3" id="floatingSelectGrid2" aria-label="Floating label select example" value={province}
                                  onChange={(event) => {
                                    setprovince(event.target.value)
                                    sessionStorage.setItem("province", event.target.value);
                                  }}>
                          <option selected >Enter/Select Province</option>
                          {
                  DropDownProvince && DropDownProvince.map((itme,index)=>{
                              return(
                                <option key={itme.id}  value={itme.value}>{itme.provincename}</option>
                              )
                            })
                          }
                      </select></div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGridcity" className="form-label labeinput">City*</label>
                      <select className="form-select inputsection py-3" id="floatingSelectGridcity" aria-label="Floating label select example" value={city}
                                  onChange={(event) => {
                                    setcity(event.target.value)
                                    sessionStorage.setItem("city", event.target.value);
                                  }}>
                          <option selected >Enter/Select City</option>
                           {
                  DropDownCities && DropDownCities.map((itme,index)=>{
                              return(
                                <option key={itme.id} value={itme.value}>{itme.Citiyname}</option>
                              )
                            })
                          }
                      </select></div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
              <p htmlFor="floatingSelectGridcity" className="form-label labeinput">My Location*</p>
              <Loaction/>
              {/* <button  className='fs-6 py-3 w-100 loactiontak px-2 fw-bold bg-light border border-secondary loactioncolor' onClick={handleShowModal}>
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
              </div> */}
                      </div>
              </div>
              </div>
        <button type="button" className="btn btnnext my-3 py-3 px-5" onClick={Detailnagation}>Next</button>
          </div>
          
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
               zoom={1}
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
      
      {/* {selectedLocation ? <p>{localStorage.setItem('latitude', selectedLocation.latitude)}</p> : ""}
      {selectedLocation ? <p>{localStorage.setItem('longitude', selectedLocation.longitude)}</p> : ""} */}
      {/* <p>{localStorage.getItem('latitude')}</p> */}
    </>
  )
}

export default Personalinformation;