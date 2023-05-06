import React ,{useState} from 'react';
import "./Personal.css";
import axios from 'axios'

import { useNavigate, useParams } from "react-router-dom";
// import { ChatState } from '../CreateContext';
function Personalinformation() {
    const navigate = useNavigate();
    const personalna=()=>{
      navigate("/Personalinformation");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }

 
  const [first_name, setfirst_name] = useState()
  const [last_name, setlast_name] = useState('')
  const [street_address, setstreet_address] = useState('')
  const [barangay, setbarangay] = useState('')
  const [province, setprovince] = useState('')
  const [city, setcity] = useState('')
  return (
    <>
<div className='Backgroundimgsection'>s</div>
      <div className="px-3 text-start">
              <button type="button" className=" btnnexttop px-5 mt-4 py-3" onClick={personalna}>PERSONAL INFORMATION</button>
              <button type="button" className=" btnnexttopnacactive  ms-3 px-5 mt-4 py-3" onClick={Detailnagation}>TFOE-PE DETAILS</button>
              
           <div className="row  p-2 mx-auto formsection">
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="FirstName" className="form-label labeinput">First Name*</label>
              <input type="text" className="form-control inputsection" id="FirstName" placeholder='Enter your First Name' aria-describedby="emailHelp" value={first_name}
                onChange={(event) => {
                  setfirst_name(event.target.value)
                  sessionStorage.setItem("item_key", event.target.value);
                }} />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="LastName" className="form-label labeinput">Last Name*</label>
              <input type="text" className="form-control inputsection" id="LastName" aria-describedby="emailHelp" placeholder='Enter your Last Name' value={last_name}
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
                          <option value={"Khyber Pakhtunkhwa"}>Khyber Pakhtunkhwa</option>
                          <option value={"Punjab "}>Punjab </option>
                          <option value={"Sindh "}>Sindh </option>
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
                          <option value={"Haripur"}>Haripur</option>
                          <option value={"Peshware"}>Peshware</option>
                          <option value={"Islamabad "}>Islamabad </option>
                      </select></div>
              </div>
              </div>
        <button type="button" className="btn btnnext my-3 py-3 px-5" onClick={Detailnagation}>Next</button>
          </div>
    </>
  )
}

export default Personalinformation;