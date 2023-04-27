import React from 'react'
import RegisterUser from '../components/Register'
import "../css/Login&Register.css"
import LoginUser from '../components/Login'

const LoginRegister = ({setActiveUser}) => {
  return (
    <div className='register'>
        <LoginUser setActiveUser={setActiveUser}/>
        <RegisterUser setActiveUser={setActiveUser}/>
    </div>
  )
}

export default LoginRegister