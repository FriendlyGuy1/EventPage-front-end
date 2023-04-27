import userServices from "../services/userService";
import React, { useState } from "react";


const LoginUser = ({setActiveUser}) => {

    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    //the main function
    const login = async(f) => {
        f.preventDefault();

        //template
        const user = {
            email: email,
            password: passwd
        }
        const Login = await userServices.loginUser(user)
        setActiveUser({
            id: Login._id,
            name: Login.name,
            role: Login.role
        })
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