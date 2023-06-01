import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './Login.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Lottie from 'react-lottie';
// import PasswordStrengthBar from 'react-password-strength-bar';

import Dataanim from '../../img/lf20_dg5oqun3.json';

function Changepassword() {

    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState(false);
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const [passwordError, setPasswordErr] = useState("");
    const [Loading, setLoading] = useState(false);
    const [labshow, setlabshow] = useState(false);

    useEffect(() => {
        if (isCPasswordDirty) {
            if (password === cpassword) {
                setShowErrorMessage(false);
                setCPasswordClass('form-control is-valid');

            } else {
                setShowErrorMessage(true)
                setCPasswordClass('form-control is-invalid')
            }
        }

    }, [cpassword])
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Dataanim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const ConfirmtogglePassword = () => {
        setConfirmPassword(!ConfirmPassword);
    };
    const strengthpassword = (e) => {
        setpassword(e.target.value);
        setlabshow(true);
    }

  return (
    <>
      <div className='main_div'>
                <div className='from_data rounded'>
                  {
      Loading? <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />:

                    <div>
                    
                    <center>
                        <h6 className='fw-bolder fs-3'>Change Password</h6>
                    </center>
                              <form className="modal-content w-100  " >
                                  {/* New Password section */}
                                  <div className='emailsection position-relative my-3 d-grid text-start'>
                                      <label htmlFor='NewPassword' className='lablesection my-1'>New Password</label>
                                      <input type={passwordShown ? "text" : "password"} id='NewPassword' value={password}
                                          // onChange={(e) => setpassword(e.target.value)}
                                          onChange={strengthpassword}
                                          className=' rounded my-2 w-100 emailinput p-2' placeholder='*********' required ></input>
                                      {passwordError}
                                      <p className='position-absolute text-end showpassicon mt-5 ' onClick={togglePassword}>
                                          {passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
                                      </p>
                                    
                                  </div>
                                  {/* password section */}
                                  <div className='emailsection position-relative my-3 d-grid'>
                                      <label htmlFor='ConfirmPassword' className='lablesection my-1 text-start'>Confirm Password</label>
                                      <input type={ConfirmPassword ? "text" : "password"} id='ConfirmPassword' value={cpassword} onChange={(e) => { setcpassword(e.target.value); setIsCPasswordDirty(true) }} className=' my-2 w-100 rounded emailinput p-2' placeholder='*********' required ></input>
                                      <p className='position-absolute text-end showpassicon mt-5 ' onClick={ConfirmtogglePassword}>
                                          {ConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                      </p>
                                      {showErrorMessage && isCPasswordDirty ? <div className='text-danger'> Passwords did not match </div> : ''}
                                  </div>

                                  {/* Button section */}
                                  <div className='w-100 mt-3 d-grid'>

                                      <button
                                          className='loginbtn w-100 border-0 py-2 rounded text-white'
                                          type='submit'
                                          onClick={() => {
                                              navigate("/");
                                          }}
                                      >
                                          Reset Password
                                      </button>
                                  </div>

                              </form>
                    

                    </div>

}
                </div>
            </div>
    </>
  )
}

export default Changepassword