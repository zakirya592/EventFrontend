import React ,{useState,useEffect} from 'react';
import "./Personal.css";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Mapss from './Mapss';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Modal, Button, Form } from "react-bootstrap";
// import { ChatState } from '../CreateContext';
function Personalinformation() {
    const navigate = useNavigate();
    const personalna=()=>{
      navigate("/Personalinformation");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }
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
  
  const apicall = (province) => {
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



  const handleProvinceChange = (event)=>{
    setprovince(event.target.value)
    const selectedProvince = event.target.value;
    sessionStorage.setItem("province", event.target.value);
   
  }

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


  // Design section 
  const [showModal, setShowModal] = useState(false);
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
  // Loaction section 
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const handleSearchBoxLoad = (ref) => {
    setSearchBox(ref);
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
                <Form.Control
                  type="text" className="form-control inputsection py-3 bg-transparent" placeholder='Your Street Address '
                  value={selectedLocation ? selectedLocation.address : ""}
                readOnly
                disabled
                />
                {/* <p className="form-control inputsection py-4" id="addrass" placeholder='Enter your Street Address ' 
                >
                  {localStorage.getItem('address')}
                  </p> */}
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
                                  onChange={handleProvinceChange }>
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
                                    // setSelectedCity(event.target.value)
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
              <button className='fs-6 py-3 w-100 loactiontak px-2 fw-bold bg-light border border-secondary loactioncolor' onClick={handleShowModal}>
                Pick your Location
              </button>
              <div className=''>
                {selectedLocation && selectedLocation ? (
                  <span className='d-flex px-2'>
                    <div className="fs-6 mx-2 text-success">{localStorage.setItem('address', selectedLocation.address)}</div>
                    <div className="fs-6 mx-2 text-success">longitude: {selectedLocation.longitude}</div>
                    <div className="fs-6 mx-2 text-success">latitude: {selectedLocation.latitude}</div>
                  </span>
                ) : (
                  <div className="fs-6 text-danger px-2">{error ? `Error: ${error}` : 'Fetching geolocation...'}</div>
                )}
              </div>
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

          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : currentLocation}
            zoom={10}
            onClick={handleMapClicked}
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
    </>
  )
}

export default Personalinformation;