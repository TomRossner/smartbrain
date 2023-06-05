import React from 'react';
import {FaBrain} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }
  
  return (
    <div id='logo-container' onClick={handleClick}>

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