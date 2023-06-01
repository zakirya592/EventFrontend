import React, { useState, useEffect } from "react";
// import log from '../../../Assets/Logo/logo.png';
import { useNavigate } from "react-router-dom";
import './OTP.css';
import axios from "axios";

function OTP() {

     const navigate = useNavigate();
  const [email, setemail] = useState("");
  // const [username, setusername] = useState();
  const [Loading, setLoading] = useState(false);

  // console.log(url)
  // Main fuction of the compount
  const apicall = () => {
    console.log(email, code.join(""));
    const OTP_NO = code.join('')
    console.log(OTP_NO)
    axios.post( `http://gs1ksa.org:3015/api/varifyOtp`, {
      OTP_NO: OTP_NO
        },
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          navigate("/Changepassword");
        } 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  function loginbutton(e) {
    e.preventDefault();
    setLoading(true);
    apicall();
  }

  // Resand timer section
  const [otptimer, setotptimer] = useState("");
const [minutes, setMinutes] = useState(1);
const [seconds, setSeconds] = useState(30);
useEffect(() => {
  const interval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval);
      } else {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, [seconds]);
const resendOTP = () => {
  setMinutes(1);
  setSeconds(20);
};


  const [code, setcode] = useState(new Array(4).fill(""));
  // const [code, setcode] = useState()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setcode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const [show, setshow] = useState(false);
  return (
    <>
    <div className='main_div'>
      <div className='from_data rounded w-50 '>

        <h1 className='headinglogin'>Verify OTP</h1>
        <p className='forOTPpro'>We have sent you one time password to your email.</p>
        <div className="bg-center-form">
          <form className="modal-content w-100" 
            onSubmit={loginbutton}      >
            <div className="mt-5 d-flex justify-content-center">
              {
                code.map((data, index) => {
                return (
                  <input
                    className="otp-field colorblue mx-2 text-dark text-center my-4"
                    type="text"
                    name = "code"
                    id="optinput"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>

            <button
              className="forlogin_btn rounded border-0 py-2 text-white w-100 mt-5" type="submit"
             
            >
             Verify OTP
            </button>

           
          </form>
        </div>
      {/* <ToastContainer /> */}
      </div>
    </div>
    </>
  )
}

export default OTP