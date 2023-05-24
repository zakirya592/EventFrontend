import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Badge from "@mui/material/Badge";
import Sidebard from '../../../Component/Sidebard/Sidebard';

const drawerWidth = 220
function Eventupdata() {
    const navigate = useNavigate();
    const [event, setevent] = useState(localStorage.getItem("eventnae"))
    const [Description, setDescription] = useState(localStorage.getItem("description"))
    const [location, setlocation] = useState(localStorage.getItem("location"))
    const [location_area, setlocation_area] = useState(localStorage.getItem("location_area"))

    // Main fuction of the compount
  const apicall = () => {
    // console.log(name, icon, IDget);
    axios.put(
        `http://gs1ksa.org:3015/api/tblUpdateEvent/${sessionStorage.getItem("updata")}`, {
        event_name: event,
        event_description: Description,
        location:location,
        location_area:location_area
    },)
      .then((res) => {
        //  setdataget(res.data);
         if (res.status === 200) {
            navigate("/Event");
        } else{
            console.log("error");
        }
        console.log(res.data);
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
    <div>
          <Box sx={{ display: 'flex' }}>
              <Sidebard />
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
                  <h6 className='fw-bolder fs-3'>UpData Event</h6>
              </center>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                          <label htmlFor="FirstName" className="form-label text-start labeinput">Event Name*</label>
              <input  className="form-control inputsection py-3" id="FirstName" placeholder='Enter event Name' 
                types='text'
                                  value={event}
                                onChange={e => {
                                    setevent(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                 <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                      <label htmlFor="Description" className="form-label text-start labeinput">Event Description*</label>
              <input  className="form-control inputsection py-3" id="Description" placeholder='Enter Event Description*' 
                types='text'
                                value={Description}
                                onChange={e => {
                                    setDescription(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                 <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                      <label htmlFor="location" className="form-label text-start labeinput">Location*</label>
                      <input className="form-control inputsection py-3" id="location" placeholder='Enter your location' 
                types='text'
                                value={location}
                                onChange={e => {
                                    setlocation(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>

                 <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3 text-start">
                      <label htmlFor="location_area" className="form-label text-start labeinput">Location Area*</label>
              <input  className="form-control inputsection py-3" id="location_area" placeholder='Enter Location Area*' 
                types='text'
                                value={location_area}
                                onChange={e => {
                                    setlocation_area(e.target.value)
                                //   sessionStorage.setItem("email", e.target.value);
                                }} />
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-4'>
              <button
                  className='loginbtn border-0 w-auto px-4 py-2 rounded text-white'
                  type='submit'
                  onClick={Update}
              >
                  Save
              </button>
              </div>
               
                </div>


              </Box>
          </Box>
    </div>
  )
}

export default Eventupdata