import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Modal, Button, Form } from "react-bootstrap";
import { Avatar, Space } from 'antd';
import cameralog from "../../img/upload-removebg-preview.png"
import Swal from "sweetalert2";

function Setting() {

    const navigate = useNavigate();
    const [DropDownCities, setDropDownCities] = useState()
    const [DropDownProvince, setDropDownProvince] = useState([]);
    const [barangayDropDown, setbarangayDropDown] = useState()
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [street_address, setstreet_address] = useState('')
    const [barangay, setbarangay] = useState()
    const [province, setprovince] = useState('')
    const [city, setcity] = useState('')
    const [club_name, setclub_name] = useState()
    const [club_region, setclub_region] = useState()
    const [club_president, setclub_president] = useState('')
    const [national_president, setnational_president] = useState('')
    const [datatake, setdatatake] = useState('')
    const [pe_ID, setpe_ID] = useState('')
    const [governmentIDImage, setgovernmentIDImage] = useState('')
    const [selfieIDImage, setselfieIDImage] = useState('')
    const [Suffix, setSuffix] = useState('')
    

    // image
    const [backimgupdload, setbackimgupdload] = useState(`https://ibb.co/r3Jkdmq`)
    function handleChangeback(e) {
        setbackimgupdload(URL.createObjectURL(e.target.files[0]));
        setgovernmentIDImage(e.target.files[0]);
        console.log(setgovernmentIDImage);
    }
    const [stateImage, setStateImage] = useState(false);

    const [selfieIDImageshow, setselfieIDImageshow] = useState(`https://ibb.co/r3Jkdmq`)
    function selfieIDImageclick(e) {
        setselfieIDImageshow(URL.createObjectURL(e.target.files[0]));
        setselfieIDImage(e.target.files[0]);
        console.log(setselfieIDImage);
    }

    const apicallpost = () => {
        const fromdata = new FormData();
        fromdata.append("first_name", first_name);
        fromdata.append("last_name", last_name);
        fromdata.append("street_address", street_address);
        fromdata.append("barangay", barangay);
        fromdata.append("province", province);
        fromdata.append("city", city);
        fromdata.append("club_name", club_name);
        fromdata.append("club_region", club_region);
        fromdata.append('club_president', club_president)
        fromdata.append("pe_ID", pe_ID);
        fromdata.append("Suffix", Suffix)
        fromdata.append("lattitiude", localStorage.getItem('latitudeupdata'));
        fromdata.append("longitude", localStorage.getItem('longitudeupdata'));
        fromdata.append("governmentIDImage", governmentIDImage);
        fromdata.append("selfieIDImage", selfieIDImage);
        console.log(fromdata);
        axios.post('http://gs1ksa.org:3015/api/tblUpdateMembers/107', {
            fromdata
        },
        )
            .then(res => {
                console.log(res);
                setclub_name("")
                setclub_region("")
                setclub_president("")
                setnational_president("")
                setdatatake("")
                setpe_ID("")
                Swal.fire({
                    title: "Success",
                    text: "Registration Submitted Successfully, kindly wait for Admin Approva",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });

            })
            .catch(err => {
                console.log(err);
            })
    }
    const [ProvinceID, setProvinceID] = useState();

    useEffect(() => {
        axios.get(`http://gs1ksa.org:3015/api/ListOfDropDownWithIDCities`)
            .then((res) => {
                setDropDownCities(res.data.recordset);
                console.log("city", res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const handleProvinceChange = (event) => {
        // setprovince(event.target.value)
        sessionStorage.setItem("province", event.target.value);
        const ProvinceID = event.target.value;
        // setProvinceID(ProvinceID)
        const ProvinceId = ProvinceID
        console.log(ProvinceId);
        // Province get api
        axios.get(`http://gs1ksa.org:3015/api/ListOfDropDownWithIDProvince/${ProvinceId}`)
            .then((res) => {
                setDropDownProvince(res.data.recordset);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // barangays get api
        axios.get(`http://gs1ksa.org:3015/api/ListOfDropDownWithIDbarangays/${ProvinceId}`)
            .then((res) => {
                setbarangayDropDown(res.data.recordset);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }



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
            <div className="row  p-2 mx-auto formsection text-start">


                <div className="col-12 mt-3">
                    <div className="mb-3">
                        <label htmlFor="Suffix" className="form-label labeinput">Suffix*</label>
                        <input type="text" className="form-control inputsection py-3" id="Suffix" aria-describedby="emailHelp" placeholder='Suffix' value={Suffix}
                            onChange={(event) => {
                                setSuffix(event.target.value)
                                localStorage.setItem("Suffix", event.target.value);
                            }}
                        />
                        <div>

                        </div>
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
                        <label htmlFor="floatingSelectGridcity" className="form-label labeinput">City*</label>
                        <select className="form-select inputsection py-3" id="floatingSelectGridcity" aria-label="Floating label select example"
                            // onChange={(event) => {
                            //   setcity(event.target.value)
                            // setSelectedCity(event.target.value)
                            //   sessionStorage.setItem("city", event.target.value);
                            // }}
                            value={ProvinceID}
                            onChange={handleProvinceChange}>
                            <option selected >Enter/Select City</option>
                            {
                                DropDownCities && DropDownCities.map((itme, index) => {
                                    return (
                                        <option key={itme.id} value={itme.provanceID}>{itme.Citiyname}</option>
                                    )
                                })
                            }
                        </select></div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                    <div className="mb-3">
                        <label htmlFor="floatingSelectGrid2" className="form-label labeinput">Province*</label>
                        <select className="form-select inputsection py-3" id="floatingSelectGrid2" aria-label="Floating label select example"

                        >
                            <option selected >Enter/Select Province</option>
                            {
                                DropDownProvince && DropDownProvince.map((itme, index) => {
                                    return (
                                        <option key={itme.id} value={itme.provincename} onChange={(() => {
                                            { localStorage.setItem('provinceID', itme.provinceID) }
                                        })}>{itme.provincename}</option>
                                    )
                                })
                            }
                        </select></div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                    <div className="mb-3">
                        <label htmlFor="floatingSelectGrid" className="form-label labeinput">Barangay*</label>
                        <select className="form-select inputsection py-3" id="floatingSelectGrid" aria-label="Floating label select example" value={barangay}
                            onChange={(event) => {
                                setbarangay(event.target.value)
                                //   sessionStorage.setItem("barangay", event.target.value);
                            }}>
                            <option selected >Enter/Select Barangay</option>
                            {
                                barangayDropDown && barangayDropDown.map((itme, index) => {
                                    return (
                                        <option key={itme.id} value={itme.barangayName}>{itme.barangayName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
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

                <div className="row  p-2 mx-auto ">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3">
                            <label htmlFor="nameinput" className="form-label labeinput">Club Name*</label>
                            <input type="text" className="form-control inputsection py-3" id="nameinput" placeholder='Enter your Club Name ' required value={club_name}
                                onChange={(event) => {
                                    setclub_name(event.target.value)
                                }} />
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3">
                            <label htmlFor="ClubRegion" className="form-label labeinput">Club Region*</label>
                            <input type="text" className="form-control inputsection py-3" id="ClubRegion" placeholder='Enter Club Region ' required value={club_region}
                                onChange={(event) => {
                                    setclub_region(event.target.value)
                                }} />
                        </div>
                    </div>
                </div>
                <div className="row  p-2 mx-auto">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3">
                            <label htmlFor="Clubp" className="form-label labeinput">Club President*</label>
                            <input type="text" className="form-control inputsection py-3" id="Clubp" placeholder='Enter your Club President' aria-describedby="emailHelp" value={club_president}
                                onChange={(event) => {
                                    setclub_president(event.target.value)
                                }} />
                        </div>
                    </div>

                    {/* Data */}
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label labeinput">Date Joined*</label>
                            <input type="date" className=" w-100 py-3 datainput inputsection rounded px-2" id="dataid" placeholder='Enter your National President'
                                onChange={(event) => {
                                    setdatatake(event.target.value);
                                }} />
                        </div>
                    </div>

                    <div className="col-12 my-2">
                        <div className="mb-3">
                            <label htmlhtmlFor="exampleInputEmail1" className="form-label labeinput">Do you already have your TFOE-PE ID?*</label>
                            <div className="backgrouncolors">
                                <div className="py-3 ms-3">

                                    <div className="form-check radialabe">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="yessetpe_ID" value="yes"
                                            checked={pe_ID === 'yes'}
                                            onChange={(event) => {
                                                setpe_ID(event.target.value);
                                            }} />
                                        <label className="form-check-label radialabe my-auto ms-2" htmlFor="yessetpe_ID">
                                            YES, I  have my TFOE-PE ID
                                        </label>
                                    </div>
                                    <div className="form-check radialabe mt-2">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="nosetpe_ID" value="no"
                                            checked={pe_ID === 'no'}
                                            onChange={(event) => {
                                                setpe_ID(event.target.value);
                                            }} />
                                        <label className="form-check-label radialabe my-auto ms-2" htmlFor="nosetpe_ID">
                                            NO, I don’t have my TFOE-PE ID yet
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row p-2 mx-auto ">

                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label labeinput">Government ID</label>


                            <div className="">
                                <div className="image-uploads ">
                                    <label htmlFor="file-inputs" className='loactiontak' >
                                        <Avatar shape="square" size={200} src={backimgupdload} className='position-relative' style={{ color: '#f56a00', lineHeight: '120px' }} ><img src={cameralog} className='cameralog' /></Avatar>
                                    </label>

                                    <input
                                        id="file-inputs"
                                        type="file"
                                        onChange={handleChangeback}
                                        className='ms-5 mt-3 position-absolute'
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                        <div className="mb-3 ">
                            <label htmlFor="image" className="form-label labeinputimage">Selfie ID</label>

                            <div className="">
                                <div className="image-uploads ">
                                    <label htmlFor="file-inputsss" className='loactiontak' >
                                        {/* <img src={cameraicon} /> */}
                                        <Avatar shape="square" size={200} src={selfieIDImageshow} className='position-relative' style={{ color: '#f56a00', lineHeight: '120px' }} ><img src={cameralog} className='cameralog' /></Avatar>

                                        {/* <CameraOutlined />  */}
                                    </label>

                                    <input
                                        id="file-inputsss"
                                        className=' mt-3 position-absolute'
                                        type="file"
                                        onChange={selfieIDImageclick}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <button type="button" className="btn btn-primary my-3 py-3 px-5 text-center" onClick={apicallpost}>Save</button>

            </div>

            {selectedLocation ? <p>{localStorage.setItem('latitudeupdata', selectedLocation.latitude)}</p> : ""}
            {selectedLocation ? <p>{localStorage.setItem('longitudeupdata', selectedLocation.longitude)}</p> : ""}
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
        </>
    )
}

export default Setting