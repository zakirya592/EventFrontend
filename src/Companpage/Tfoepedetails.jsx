import React ,{useState}from 'react'
import "./Personal.css"
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function Tfoepedetails() {
    const navigate = useNavigate();
    const [value, setValue] = useState()

    const personalna = () => {
        navigate("/");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }

  return (
   <>
<div className='Backgroundimgsectionas'>s</div>
          <div className="px-3  text-start">
              <button type="button" className=" btnnexttopnacactive px-5 mt-4 py-3" onClick={personalna}>PERSONAL INFORMATION</button>
              <button type="button" className="  btnnexttop ms-3 px-5 mt-4 py-3" onClick={Detailnagation}>TFOE-PE DETAILS</button>
              <div className="formsection">

              
           <div className="row  p-2 mx-auto ">
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label labeinput">Club Name*</label>
                      <input type="text" className="form-control inputsection" id="exampleInputEmail1" placeholder='Enter your Club Name ' aria-describedby="emailHelp" />
                  </div>
                </div>
                  </div>
                  <div className="row  p-2 mx-auto">
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                          <label htmlFor="ClubRegion" className="form-label labeinput">Club Region*</label>
                          <select className="form-select inputsection py-3" id="ClubRegion" aria-label="Floating label select example">
                              <option selected >Enter/Select Club Region</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                          </select></div>
                  </div>
                  </div>

                  <div className="row  p-2 mx-auto">
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                              <label htmlFor="Clubp" className="form-label labeinput">Club President*</label>
                              <input type="text" className="form-control inputsection" id="Clubp" placeholder='Enter your Club President' aria-describedby="emailHelp" />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                              <label htmlFor="National" className="form-label labeinput">National President*</label>
                              <input type="text" className="form-control inputsection" id="National" aria-describedby="emailHelp" placeholder='Enter your National President' />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label labeinput">Date Joined*</label>
                          <input type="date" className=" w-100 py-3 datainput inputsection" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your National President' />
                      </div>
                  </div>

                      <div className="col-12 my-2">
                          <div className="mb-3">
                              <label htmlhtmlFor="exampleInputEmail1" className="form-label labeinput">Do you already have your TFOE-PE ID?*</label>
                              <div className="backgrouncolors">
                                <div className="py-3 ms-3">

                                  <div className="form-check radialabe">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value=""/>
                                          <label className="form-check-label radialabe my-auto ms-2" htmlFor="flexCheckDefault">
                                          YES, I  have my TFOE-PE ID
                                          </label>
                                  </div>
                                  <div className="form-check radialabe mt-2">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value=""  />
                                          <label className="form-check-label radialabe my-auto ms-2" htmlFor="flexCheckChecked">
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
                              <label htmlFor="ClubSecretary" className="form-label labeinput">Club Secretary Name*</label>
                          <input type="text" className="form-control inputsection" id="exampleInputEmail1" placeholder='Enter your Club Secretary Name' aria-describedby="emailHelp" />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label labeinput">Club Secretary Contact Number*</label>
                              {/* <input type="tel" className="form-control inputsection" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='0000000000' /> */}
                              <PhoneInput
                                  className="w-100 py-1 rounded inputsection" 
                                  placeholder="()0000000000"
                                  country="US"
                                  value={value}
                                  onChange={setValue} />
                              
                      </div>
                  </div>
              </div>

              </div>
              <button type="button" className="btn btnnext my-3 py-3 px-5">SUBMIT</button>
          </div>
    </>
  )
}

export default Tfoepedetails