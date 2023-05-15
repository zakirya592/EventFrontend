import React ,{useState}from 'react'
import "./Personal.css"
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios'
import { ChatState } from '../CreateContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
function Tfoepedetails(props) {
    const navigate = useNavigate();
    const [value, setValue] = useState()

    const personalna = () => {
        navigate("/Personalinformation");
    }
    const Detailnagation = () => {
        navigate("/Sendinquiry");
    }

     const [first_name, setfirst_name] = useState('')
  const [last_name, setlast_name] = useState('')
  const [street_address, setstreet_address] = useState('')
  const [barangay, setbarangay] = useState('')
  const [province, setprovince] = useState('')
  const [city, setcity] = useState('')
  const [club_name, setclub_name] = useState()
  const [club_region, setclub_region] = useState()
  const [club_president, setclub_president] = useState('')
  const [national_president, setnational_president] = useState('')
  const [datatake, setdatatake] = useState('')
  const [pe_ID, setpe_ID] = useState('')
  const [club_secretry_name, setclub_secretry_name] = useState('')
  const [club_secretry_NO, setclub_secretry_NO] = useState('')

 
     // post api
    const apicall = () => {
        console.log(sessionStorage.getItem("item_key"))
        axios.post('http://gs1ksa.org:3015/api/tblPostMembers',
            {
              email: sessionStorage.getItem("email"),
              password: sessionStorage.getItem("password"),
              first_name: sessionStorage.getItem("item_key"),
              last_name: sessionStorage.getItem("last_name"),
              street_address: sessionStorage.getItem("street_address"),
              barangay: sessionStorage.getItem("barangay"),
              province: sessionStorage.getItem("province"),
              city: sessionStorage.getItem("city"),  
              club_name: club_name,
              club_region: club_region,
              club_president: club_president,
              national_president: national_president,
              date: datatake,
              pe_ID: pe_ID,
              club_secretry_name: club_secretry_name,
              club_secretry_NO: club_secretry_NO,

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
                setclub_secretry_name("")
                setclub_secretry_NO("")
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
                toast.error(`Error ocurre due to ${err.state}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
               

            })
    }

    // const { apicalld,
    //     first_name, setfirst_name,
    //     club_name, setclub_name,
    //     club_region, setclub_region,
    //     club_president, setclub_president,
    //     national_president, setnational_president,
    //     club_secretry_name, setclub_secretry_name,
    //     date, setdate
    // } = ChatState();

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
                      <label htmlFor="nameinput" className="form-label labeinput">Club Name*</label>
                              <input type="text" className="form-control inputsection py-3" id="nameinput" placeholder='Enter your Club Name ' required value={club_name}
                                  onChange={(event) => {
                                      setclub_name(event.target.value)
                                  }} />
                  </div>
                </div>
                  </div>

                  <div className="row  p-2 mx-auto">
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                          <label htmlFor="ClubRegion" className="form-label labeinput">Club Region*</label>
                              <select className="form-select inputsection py-3" id="ClubRegion" aria-label="Floating label select example" required value={club_region}
                                  onChange={(event) => {
                                      setclub_region(event.target.value)
                                  }}>
                              <option selected >Enter/Select Club Region</option>
                              <option value={"Haripur"}>Haripur</option>
                              <option value={"Bannu"}>Bannu</option>
                              <option value={"Karak"}>Karak</option>
                          </select></div>
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

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                              <label htmlFor="National" className="form-label labeinput">National President*</label>
                              <input type="text" className="form-control py-3 inputsection" id="National" aria-describedby="emailHelp" placeholder='Enter your National President' value={national_president}
                                  onChange={(event) => {
                                      setnational_president(event.target.value)

                                  }} />
                      </div>
                  </div>
{/* Data */}
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label labeinput">Date Joined*</label>
                              <input type="date" className=" w-100 py-3 datainput inputsection rounded px-2"  id="dataid"  placeholder='Enter your National President' 
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
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="yes"
                                              checked={pe_ID === 'yes'}
                                              onChange={(event) => {
                                                  setpe_ID(event.target.value);
                                              }} />
                                          <label className="form-check-label radialabe my-auto ms-2" htmlFor="flexCheckDefault">
                                          YES, I  have my TFOE-PE ID
                                          </label>
                                  </div>
                                  <div className="form-check radialabe mt-2">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="no"
                                              checked={pe_ID === 'no'}
                                              onChange={(event) => {
                                                  setpe_ID(event.target.value);
                                              }} />
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
                              <input type="text" className="form-control inputsection py-3" id="ClubSecretary" placeholder='Enter your Club Secretary Name'  value={club_secretry_name}
                                  onChange={(event) => {
                                      setclub_secretry_name(event.target.value)
                                  }} />
                      </div>
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                      <div className="mb-3">
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
              </div>

              </div>
              <button type="button" className="btn btnnext my-3 py-3 px-5" onClick={apicall}>SUBMIT</button>
              <ToastContainer />
          </div>
    </>
  )
}

export default Tfoepedetails