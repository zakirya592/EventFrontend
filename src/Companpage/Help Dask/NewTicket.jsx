import React, { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"; 
import Sidebard from '../../Component/Sidebard/Sidebard';
import Box from "@mui/material/Box";
import { Modal, Button, Form } from "react-bootstrap";
const drawerWidth = 220
function NewTicket() {

    const [first_name, setfirst_name] = useState()
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    const [issue, setissue] = useState('')
    const [Additional, setAdditional] = useState('')

  return (
    <>
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
                <div className="mt-5">
                    <div className="row w-100 mx-auto">
                          <h4 className='text-Secondary fw-bold mb-4'>Help Dask Request From</h4>
                          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2 text-start">
                              <div className="mb-3">
                                  <label htmlFor="FirstName" className="form-label labeinput">First Name*</label>
                                  <input type="text" className="form-control inputsection py-3" id="FirstName" placeholder='Enter your First Name' aria-describedby="emailHelp" value={first_name}
                                      onChange={(event) => {
                                          setfirst_name(event.target.value)
                                          sessionStorage.setItem("item_key", event.target.value);
                                      }} />
                              </div>
                          </div>

                          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2 text-start">
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

                          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 text-start">
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label labeinput">Email*</label>
              <input className="form-control inputsection py-3" id="FirstName" placeholder='Enter your Email' aria-describedby="emailHelp"
                types='email'
                value={email}
                onChange={e => {
                  setemail(e.target.value)
                  sessionStorage.setItem("email", e.target.value);
                }} />
            </div>
                          </div>

                          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 text-start">
                              <div className="mb-3">
                                  <label htmlFor="floatingSelectGrid" className="form-label labeinput ">What's the issue?</label>
                                  <select className="form-select inputsection py-3" id="floatingSelectGrid" aria-label="Floating label select example" value={issue}
                                      onChange={(event) => {
                                          setissue(event.target.value)
                                      }}>
                                      <option selected >Enter/Select What's the issue</option>
                                      <option value={"First"}>One</option>
                                      <option value={"Second"}>Two</option>
                                      <option value={"three"}>Three</option>
                                  </select>
                              </div>
                          </div>

                          <div className="col-12 mt-3 text-start">
                              <div className="mb-3">
                                  <label htmlFor="addrass" className="form-label labeinput">Additional details*</label>
                                  <div>
                                      <Form.Control
                                          type="text" className="form-control inputsection py-3 bg-transparent" placeholder='Additional details'
                                          value={Additional}
                                          onChange={((e)=>{
                                              setAdditional(e.target.value)
                                          })}
                                      />
                                  </div>
                              </div>
                          </div>

                    </div>
                      <button type="button" class="btn btn-primary py-1 px-5 rounded mt-4">Save</button>

                </div>

              </Box>
          </Box>
    </>
  )
}

export default NewTicket