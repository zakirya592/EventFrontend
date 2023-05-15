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
function Login() {
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

    
const apicall = () =>{
    axios.post('http://gs1ksa.org:3015/api/UserLoginAuth', {
      email:email,
      password:password,
    }, ).then((res)=>{
        setLoading(false);
      console.log(res);
        if (res.status === 200) {
            navigate("/List/members");
          
        } else{
             setError("Invalid Username or Password!");
        }
    
    }).catch((err)=>{
      console.log(err);
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
                        <h6 className='fw-bolder fs-3'>Welcome</h6>
                        <p className=' fs-6'>Let's get Started</p>
                    </center>
                    <form className='modal-content w-100 ' onSubmit={loginbutton}>
                        {/* Email section */}
                        <div className='emailsection position-relative d-grid my-2'>
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

                        {/* password section */}
                        <div className='emailsection position-relative my-2 d-grid'>
                            <label
                                htmlFor='password'
                                className='lablesection text-start my-1'
                            >
                                Password
                            </label>
                            <p
                                className='position-absolute text-end   LockOutlinedicon'
                            >
                                <LockOutlined />
                            </p>
                            <input
                                type={passwordShown ? 'text' : 'password'}
                                id='password'
                                className=' rounded mt-2 ps-4 emailinput py-2'
                                placeholder='*********'
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                                required
                            ></input>
                            <p
                                className='position-absolute text-end showpassicon mt-5 '
                                onClick={togglePassword}
                            >
                                {passwordShown ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </p>
                            
                        </div>

                        {error ? <lable className='text-danger text-start mb-2'>{error}</lable> : null}  
                        {/* Forgetpassword */}
                        <p
                            className='Forgetpassword text-end cursor '
                            onClick={() => {
                                navigate('/Forgetpassword')
                            }}
                        >
                            Forget password?
                        </p>
                        {/* Button section */}
                        <div className='emailsection mt-3 d-grid'>
                            
                            <button
                                className='loginbtn border-0 py-2 rounded text-white'
                                type='submit'

                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="registerbtn mt-3">
                        <p className='registerbtn'>Don't have an account ? <span className='Registersingup' onClick={()=>{
                            navigate("/Personalinformation");
                        }}>Register</span></p>
                    </div>

                    </div>

}
                </div>
            </div>
        </>
    )
}

export default Login