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
import Dataanim from '../../img/lf20_dg5oqun3.json';

function Forgetpassword() {

    const [passwordShown, setPasswordShown] = useState(false)
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState()
    const [Mobilenumber, setMobilenumber] = useState()
    const [error, setError] = useState();
    const [Loading, setLoading] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Dataanim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }


    const apicall = () => {
        axios.post('http://gs1ksa.org:3015/api/passwordchangeotpSend', {
            email: email
        },).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                navigate("/OTP");
                console.log(res);
            } else {
                setError("Invalid Username or Password!");
            }
        }).catch((err) => {
            setLoading(false);
            setError("Invalid Username or Password!");

        })
    }
    function loginbutton(e) {
        e.preventDefault()
        setLoading(true);
        apicall()
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
                        <h6 className='fw-bolder fs-3'>Forget Password</h6>
                    </center>
                    <form className='modal-content' onSubmit={loginbutton}>
                        {/* Email section */}
                        <div className='emailsection position-relative d-grid my-5'>
                            <label htmlFor='email' className='lablesection text-start mb-1'>
                                Email
                            </label>
                            <p
                                className='position-absolute text-end emailicon'
                            >
                                <MailOutlined />
                            </p>
                            <input
                                types='email'
                                id='email'
                                value={email}
                                onChange={e => {
                                    setemail(e.target.value)
                                    {
                                      localStorage.setItem('emailhomme',e.target.value)
                                    }
                                }}
                                className='rounded emailinput py-2 ps-4'
                                placeholder='example@gmail.com'
                                required
                            ></input>
                        </div>


                        {/* Button section */}
                        <div className='w-100 mt-3 d-grid'>
                            
                            <button
                                className='loginbtn w-100 border-0 py-2 rounded text-white'
                                type='submit'
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

export default Forgetpassword