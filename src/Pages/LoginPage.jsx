import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../Services/allApi';


function LoginPage({ register }) {

  const navigate = useNavigate()

  const [datas, setDatas] = useState({})

  const [userDetails, setUserDetails] = useState({
    username: "",
    emailId: "",
    mobile: "",
    password: ""
  })
  console.log(userDetails);


  
  const handleRegister = async () => {
    const { username, emailId, password, mobile } = userDetails

    if (!username || !emailId || !password || !mobile) {
      alert('Please fill the form completely')
    }
    else if (!/^[0-9]{10}$/.test(mobile)) {
      alert('Please insert valid Mobile Number')
    }
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailId)) {
      alert('Please insert a valid Email Id')
    }
    else if (!/^[a-zA-Z\s]+$/.test(username)) {
      alert('Please insert a valid Username')
    }
    else {
      const result = await registerApi(userDetails)
      console.log(result);

      if (result.status >= 200 && result.status < 300) {
        localStorage.setItem('registeredUser', JSON.stringify(userDetails));
        alert('Registration Successfull')
        setDatas(result)

        navigate('/')
      }
      else {
        alert('Something went wrong')
      }
    }
  }


  const handleLogin = async () => {
    const { emailId, password, username, mobile } = userDetails
    if (!emailId || !password) {
      alert('Please fill the form completely')
    }
    else {

      const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

      if (registeredUser && registeredUser.emailId === emailId && registeredUser.password === password) {
        alert('Login Successful');

        setUserDetails({
          username,
          emailId,
          mobile,
          password
        })

        setTimeout(() => {
          navigate('/Home');
        }, 2000);
      }
      else {
        alert('please enter a valid email or password')
      }
    }
  }


  return (
    <>
      <div className='container'>
        <div className="row" style={{ marginTop: "150px" }}>

          <div className='w-100 bg-transparent' style={{ height: "auto" }}>
            <div className="row">
              <div className="col-md-3"></div>

              <div className="col-md-6">

                {!register ? <p className='fs-4 text-center text-secondary'>Sign In to Your Account</p>
                  :
                  <p className='fs-4 text-center text-secondary'>Sign Up to Your Account</p>}

                {register && <div className='mb-3 pe-5 ps-5 md:ps-0'>
                  <input type="text" placeholder='Username' className='form-control rounded-0' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                  <input type="text" placeholder='Mobile' className='form-control rounded-0 mt-3' onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })} />
                </div>


                }


                <div className='mb-3 pe-5 ps-5 md:ps-0'>
                  <input type="text" placeholder='Email ID' className='form-control shadow rounded-0 ' onChange={(e) => setUserDetails({ ...userDetails, emailId: e.target.value })} />
                </div>

                <div className='mb-3 pe-5 ps-5 md:ps-0'>
                  <input type="password" placeholder='Password' className='form-control shadow mt-3 rounded-0' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                </div>

                {!register ? <div className='pe-5 mb-3 ps-5 md:ps-0'>
                  <button type='button' className='btn btn-warning form-control rounded-0 ' onClick={handleLogin} >Login</button>
                  <p className='mt-3 '>New User?click Here to <Link to={'/register'} className='text-danger' >Register</Link></p>
                </div>
                  :
                  <div className='pe-5 ps-5 md:ps-0'>
                    <button type='button' className='btn btn-warning form-control rounded-0 ' onClick={handleRegister} >Register</button>
                    <p className='mt-3'>Already a User?click Here to <Link to={'/'} className='text-danger' >Login</Link></p>
                  </div>}
              </div>

              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage