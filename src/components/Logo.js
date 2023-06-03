import React from 'react';
import {FaBrain} from "react-icons/fa";

const Logo = () => {
  return (
    <div id='logo-container'>

        <div id='logo'>
            <span id='SB' className='letters'>S B</span>
            <span className='icon-container'>
                <FaBrain className='icon'/>
            </span>
        </div>

        <p>Smart Brain</p>
        
    </div>
  )
}

export default Logo;