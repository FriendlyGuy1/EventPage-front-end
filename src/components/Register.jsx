import userServices from "../services/userService";
import React, { useState } from "react";

// The name can change if we would be splitting them up
const RegisterUser = () => {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [passwd, setPasswd] = useState('')

    //the main function
    const register = (f) => {
        f.preventDefault();

        //template
        const newUser = {
            name: userName,
            email: email,
            password: passwd
        }
        userServices.registerUser(newUser)

        setEmail('')
        setUserName('')
        setPasswd('')

        console.log("register done")
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