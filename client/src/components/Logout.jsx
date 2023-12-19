import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'


const Logout = () => {
    const navigate = useNavigate();
    
    //This function clears the localStorage and logs ou the user.
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <Button onClick={()=> {handleClick()}}>
        <BiPowerOff size={30}/>
    </Button>
  )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 100%;
    background-color: #a9c25d;
    border: none;
    cursor: pointer;
    svg{
        color: white;
    }
    &:hover {
        background: #e15b64
    }
`;

export default Logout