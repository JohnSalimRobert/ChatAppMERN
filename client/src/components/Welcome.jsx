import React from 'react'
import styled from 'styled-components';
import welcome from '../assets/welcome.gif'

const Welcome = ({currentUser}) => {
  return (
   <Container>
    <img src={welcome} alt='welcome gif'></img>
    <h1>Welcome, <span>{currentUser.username}</span></h1>
    <h3>Please select a chat to start texting!</h3>
   </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
img{
    padding-bottom: 5rem;
    height: 15rem;
    width: 10rem;
}
@media screen and (min-width: 720px) and (max-width: 1080px) {
  img {
    height: 12rem;
    width: 7rem;
  }
}
@media screen and (min-width: 360px) and (max-width: 719px) {
  img {height: 12rem;
    width: 7rem;}
    h3{
      font-size: 0.8rem;
    }
    h1 {
      font-size: 1.2rem;
    }
}
`;


export default Welcome