import React from 'react'
import userlogin from '../assets/userlogin.svg'


const Header = () => {
    return (
        <>
            <h1>Renginiai</h1>
            <a href="" target="_blank">
                <img src={userlogin} className="logo" alt="log in" />
            </a>
        </>
    )
}

export default Header