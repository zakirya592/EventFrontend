import React from 'react';
import "./Personal.css"
import { useNavigate, useParams } from "react-router-dom";
function Personalinformation() {
    const navigate = useNavigate();
    const personalna=()=>{
        navigate("/");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }

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
                          <input type="text" className="form-control inputsection" id="FirstName" placeholder='Enter your First Name' aria-describedby="emailHelp" />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                          <label htmlFor="LastName" className="form-label labeinput">Last Name*</label>
                          <input type="text" className="form-control inputsection" id="LastName" aria-describedby="emailHelp" placeholder='Enter your Last Name' />
                  </div>
                </div>

                <div className="col-12 mt-3">
                      <div className="mb-3">
                      <label htmlFor="addrass" className="form-label labeinput">Street Address*</label>
                 <div>
                          <textarea className="form-control inputsection" id="addrass" aria-describedby="emailHelp" placeholder='Enter your Street Address ' ></textarea>
                    </div> 
                  </div>
                </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGrid" className="form-label labeinput">Barangay*</label>
                      <select className="form-select inputsection py-3"  id="floatingSelectGrid" aria-label="Floating label select example">
                          <option selected >Enter/Select Barangay</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                      </select>
                      </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGrid2" className="form-label labeinput">Province*</label>
                      <select className="form-select inputsection py-3" id="floatingSelectGrid2" aria-label="Floating label select example">
                          <option selected >Enter/Select Province</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                      </select></div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="floatingSelectGridcity" className="form-label labeinput">City*</label>
                      <select className="form-select inputsection py-3" id="floatingSelectGridcity" aria-label="Floating label select example">
                          <option selected >Enter/Select City</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                      </select></div>
              </div>
              </div>
              <button type="button" className="btn btnnext my-3 py-3 px-5">Next</button>
          </div>
    </>
  )
}

export default Personalinformation;