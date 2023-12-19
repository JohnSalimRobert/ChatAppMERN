import React from 'react'
import styled from 'styled-components'
import { MdOutlineReply } from "react-icons/md";

export const Messages = ({scrollRef, fromSelf, message, swipeToReply}) => {
  return (
    <Container >
 <div ref={scrollRef} >
                  <div
                    className={`message ${
                      fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message}</p>
                    </div>
                    <span
                      onClick={() => swipeToReply(message,fromSelf)}
                      className={`reply ${ 
                        fromSelf ? "hidden" : ""
                      }`}
                    >
                      <MdOutlineReply />
                    </span>
                  </div>
                </div>
    </Container>
  )
}

const Container = styled.div`
height: 100%;
.message {
  display: flex;
  align-items: center;
  .content {
    max-width: 40%;
    overflow-wrap: break-word;
    padding: 1rem;
    border-radius: 1rem;
    p {
      font-size: 1.1rem;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        font-size: .8rem;
      }
      @media screen and (min-width: 360px) and (max-width: 719px) {
        font-size: .6rem;
      }
    }
  }
}
.sended {
  justify-content: flex-end;
  .content {
    background-color: #e2fa98;
  }
}
.recieved {
  justify-content: flex-start;
  .content {
    background-color: white;
  }
}
.hidden{
  display: none;
 
}
.reply{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-left:0.5rem;
  background-color: lightgray;
  border-radius: 100%;
  &:hover {
    background: gray;
}
}
`;