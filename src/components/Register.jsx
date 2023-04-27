import userServices from "../services/userService";
import React, { useState } from "react";

const RegisterUser = ({setActiveUser}) => {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [passwd, setPasswd] = useState('')

    //the main function
    const register = async(f) => {
        f.preventDefault();

        //template
        const newUser = {
            name: userName,
            email: email,
            password: passwd
        }
        const Login = await userServices.registerUser(newUser)
        setActiveUser({
            id: Login._id,
            name: Login.name,
            role: Login.role
        })

        setEmail('')
        setUserName('')
        setPasswd('')

        console.log("register function done")
    }

    return(
        <div>
            <div>
                <label>Email</label>
                <input 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Name</label>
                <input 
                    type="text"
                    placeholder="Enter Name"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password"
                    placeholder="Enter Password"
                    value={passwd}
                    onChange={(e)=>setPasswd(e.target.value)}/>
            </div>
            <button onClick={register}>Register</button>
        </div>
    )
}

export default RegisterUser