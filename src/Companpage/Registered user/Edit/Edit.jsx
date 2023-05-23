import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../../Component/Sidebard/Sidebard';
import PhoneInput from 'react-phone-number-input'

const drawerWidth = 220

function Edit() {
    const navigate = useNavigate();
    const [first_name, setfirst_name] = useState()
    const [last_name, setlast_name] = useState()
    const [barangay, setbarangay] = useState()
    const [province, setprovince] = useState()
    const [city, setcity] = useState()
    const [club_name, setclub_name] = useState()
    const [club_region, setclub_region] = useState()
    const [club_president, setclub_president] = useState('')
    const [national_president, setnational_president] = useState('')
    const [club_secretry_name, setclub_secretry_name] = useState(sessionStorage.getItem("club_secretry_name"))
    const [club_secretry_NO, setclub_secretry_NO] = useState('')

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

    const [DropDownProvince, setDropDownProvince] = useState([]);

    const apicallprovince = () => {
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
        apicallprovince();
    }, []);
    // Main fuction of the compount
    console.log(localStorage.getItem("updataregisteruser"));
    const apicall = () => {
        axios.put(
            `http://gs1ksa.org:3015/api/tblUpdateMembers/${localStorage.getItem("updataregisteruser")}`, {
            first_name: first_name,
            last_name: last_name,
            barangay:barangay,
            province:province,
            city:city,
            club_name:club_name,
            club_region:club_region,
            club_president:club_president,
            national_president:national_president,
            club_secretry_name:club_secretry_name,
            club_secretry_NO:club_secretry_NO
        },)
            .then((res) => {
                //  setdataget(res.data);
                if (res.status === 200) {
                    navigate("/Register");
                } else {
                    console.log("error");
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const Update = () => {
        apicall();
        // setOpen(false);
    };


  return (
    <>
    <Box sx={{ display: 'flex' }}>
              <Sidebard/>
              <AppBar
                  className='fortrans'
                  position='fixed'
                  sx={{
                      width: { sm: `calc(100% - ${drawerWidth}px)` },
                      ml: { sm: `${drawerWidth}px` }
                  }}
              ></AppBar>
              <Box
                  className=''
                  sx={{
                      flexGrow: 1,
                      my: 5,
                      mx: 1,
                      width: { sm: `calc(100% - ${drawerWidth}px)` }
                  }}
              >
        <div className="row  p-2 mx-auto mt-5">
              <center>
                  <h6 className='fw-bolder fs-3'>UpData Register User</h6>
              </center>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                          <label htmlFor="FirstName" className="form-label text-start labeinput">First Name *</label>
              <input  className="form-control inputsection py-3" id="FirstName" placeholder='Enter event Name' 
                types='text'
                                  value={first_name}
                                onChange={e => {
                                    setfirst_name(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                 <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                              <label htmlFor="Description" className="form-label text-start labeinput">Last Name *</label>
              <input  className="form-control inputsection py-3" id="Description" placeholder='Enter Event Description*' 
                types='text'
                                value={last_name}
                                onChange={e => {
                                setlast_name(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="floatingSelectGrid" className="form-label labeinput text-start">Barangay*</label>
                              <select className="form-select inputsection py-3" id="floatingSelectGrid" aria-label="Floating label select example" value={barangay}
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
                          <div className="mb-3 text-start">
                              <label htmlFor="floatingSelectGrid2" className="form-label labeinput text-start">Province*</label>
                              <select className="form-select inputsection py-3" id="floatingSelectGrid2" aria-label="Floating label select example" value={province}
                                  onChange={(event) => {
                                      setprovince(event.target.value)
                                      sessionStorage.setItem("province", event.target.value);
                                  }}>
                                  <option selected >Enter/Select Province</option>
                                  {
                                      DropDownProvince && DropDownProvince.map((itme, index) => {
                                          return (
                                              <option key={itme.id} value={itme.value}>{itme.provincename}</option>
                                          )
                                      })
                                  }
                              </select></div>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="floatingSelectGridcity" className="form-label labeinput text-start">City*</label>
                              <select className="form-select inputsection py-3" id="floatingSelectGridcity" aria-label="Floating label select example" value={city}
                                  onChange={(event) => {
                                      setcity(event.target.value)
                                      sessionStorage.setItem("city", event.target.value);
                                  }}>
                                  <option selected >Enter/Select City</option>
                                  {
                                      DropDownCities && DropDownCities.map((itme, index) => {
                                          return (
                                              <option key={itme.id} value={itme.value}>{itme.Citiyname}</option>
                                          )
                                      })
                                  }
                              </select></div>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="nameinput" className="form-label labeinput">Club Name*</label>
                              <input type="text" className="form-control inputsection py-3" id="nameinput" placeholder='Enter your Club Name ' required value={club_name}
                                  onChange={(event) => {
                                      setclub_name(event.target.value)
                                  }} />
                          </div>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="ClubRegion" className="form-label labeinput">Club Region*</label>
                              <input type="text" className="form-control inputsection py-3" id="ClubRegion" placeholder='Enter Club Region ' required value={club_region}
                                  onChange={(event) => {
                                      setclub_region(event.target.value)
                                  }} />
                          </div>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="Clubp" className="form-label labeinput">Club President*</label>
                              <input type="text" className="form-control inputsection py-3" id="Clubp" placeholder='Enter your Club President' aria-describedby="emailHelp" value={club_president}
                                  onChange={(event) => {
                                      setclub_president(event.target.value)
                                  }} />
                          </div>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="National" className="form-label labeinput">National President*</label>
                              <input type="text" className="form-control py-3 inputsection" id="National" aria-describedby="emailHelp" placeholder='Enter your National President' value={national_president}
                                  onChange={(event) => {
                                      setnational_president(event.target.value)

                                  }} />
                          </div>
                      </div>

                       <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 text-start">
                              <label htmlFor="ClubSecretary" className="form-label labeinput">Club Secretary Name*</label>
                              <input type="text" className="form-control inputsection py-3" id="ClubSecretary" placeholder='Enter your Club Secretary Name'  value={club_secretry_name}
                                  onChange={(event) => {
                                      setclub_secretry_name(event.target.value)
                                  }} />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3 text-start">
                          <label htmlFor="exampleInputEmail1" className="form-label labeinput">Club Secretary Contact Number*</label>
                              {/* <input type="tel" className="form-control inputsection" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='0000000000' /> */}
                              <PhoneInput
                                  className="w-100 py-3 rounded inputsection" 
                                  placeholder="()0000000000"
                                  country="US"
                                  value={club_secretry_NO}
                                  onChange={(event) => {
                                      setclub_secretry_NO(event)
                                  }} />
                              
                      </div>
                  </div>
                 


                <div className='d-flex align-items-center justify-content-center mt-4'>
              <button
                  className='loginbtn border-0 w-auto px-4 py-2 rounded text-white'
                  type='submit'
                  onClick={Update}
              >
                  Up Data
              </button>
              </div>
               
                </div>


              </Box>
          </Box>
    </>
  )
}

export default Edit