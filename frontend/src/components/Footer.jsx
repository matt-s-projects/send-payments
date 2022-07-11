import React from 'react'
import logo from "../images/hmsendlogo.png"

function Footer() {
    return (
        <div className='bg-dark pb-2'>
            <img src={logo} className='mt-3 mb-1 Foot-logo'></img>
            <h6 className='text-secondary'>Created By: Matthew Stein</h6>
            <h6 className='text-secondary'>Email: Mkstein16@gmail.com</h6>
        </div>
    )
}

export default Footer