import React from 'react'
import RegisterUser from '../components/Register'
import "../css/Login&Register.css"
import LoginUser from '../components/Login'

const LoginRegister = () => {
  return (
    <div className='register'>
        <LoginUser />
        <RegisterUser />
    </div>
  )
}

export default LoginRegister