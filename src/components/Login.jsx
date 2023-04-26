import userServices from "../services/userService";
import React, { useState } from "react";

// The name can change if we would be splitting them up
const LoginUser = () => {

    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    //the main function
    const login = (f) => {
        f.preventDefault();

        //template
        const user = {
            email: email,
            password: passwd
        }
        userServices.loginUser(user)

        setEmail('')
        setPasswd('')

        console.log("login function done")
    }

    return(
        <div>
            <form>
                <label>Email</label>
                <input 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
            </form>
            <form>
                <label>Password</label>
                <input 
                    type="password"
                    placeholder="Enter Password"
                    value={passwd}
                    onChange={(e)=>setPasswd(e.target.value)}/>
            </form>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default LoginUser