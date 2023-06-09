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
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import cameralog from "../img/upload-removebg-preview.png"

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


    const lattitiude = localStorage.getItem('latitude')
    const longitudess = localStorage.getItem('longitude')
    console.log(lattitiude, longitudess);
     // post api
    const apicall = () => {
        const fromdata = new FormData();
        fromdata.append("email", sessionStorage.getItem("email"));
        fromdata.append("password", sessionStorage.getItem("password"));
        fromdata.append("first_name", sessionStorage.getItem("item_key"));
        fromdata.append("last_name", sessionStorage.getItem("last_name"));
        fromdata.append("street_address", sessionStorage.getItem("address"));
        fromdata.append("barangay", sessionStorage.getItem("barangay"));
        fromdata.append("province", sessionStorage.getItem("province"));
        fromdata.append("Suffix", localStorage.getItem("Suffix"))
        fromdata.append("city", sessionStorage.getItem("city"));
        fromdata.append("club_name", club_name);
        fromdata.append("club_region", club_region);
        fromdata.append('club_president', club_president)
        fromdata.append("national_president", national_president);
        fromdata.append("date", datatake);
        fromdata.append("pe_ID", pe_ID);
        fromdata.append("club_secretry_name", club_secretry_name);
        fromdata.append("club_secretry_NO", club_secretry_NO);
        fromdata.append("lattitiude", localStorage.getItem('latitude'));
        fromdata.append("longitude", localStorage.getItem('longitude'));
        fromdata.append("governmentIDImage", governmentIDImage);
        fromdata.append("selfieIDImage", selfieIDImage);
        console.log(fromdata);
        axios.post('http://gs1ksa.org:3015/api/tblPostMembers',fromdata ,
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
                                    {/* <img
                                        alt="Travis Howard"
                                        className="Foruploadimgsettingback "
                                        src={backimgupdload}
                                    /> */}
                              {/* <Avatar shape="square" size={150}  src={backimgupdload}/> */}

                          </div>
                      </div>

                       <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                          <div className="mb-3 ">
                              <label htmlFor="image" className="form-label labeinputimage">Selfie ID</label>
           
                   <div className="">
                                    <div className="image-uploads ">
                                      <label htmlFor="file-inputsss" className='loactiontak' >
                                            {/* <img src={cameraicon} /> */}
                                          <Avatar shape="square" size={200} src={selfieIDImageshow} className='position-relative' style={{  color: '#f56a00', lineHeight:'120px' }} ><img src={cameralog} className='cameralog'/></Avatar>
                                          
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

              </div>
              <button type="button" className="btn btnnext my-3 py-3 px-5" onClick={apicall}>SUBMIT</button>
              <ToastContainer />
          </div>
    </>
  )
}

export default Tfoepedetails