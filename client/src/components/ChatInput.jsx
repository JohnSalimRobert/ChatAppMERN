import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { IoIosClose } from "react-icons/io";

const ChatInput = ({handleSendMsg, reply, closeReply, currentChatUser}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    // handleSendMsg is a parent function sent down to it's child via props
    // The sendChat function is sending the user messages to the parent function
    // onSubmit()
    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length){
            handleSendMsg(msg);
            setMsg('');
        }
        closeReply();
    }


  return (
    <Container>
        {reply ? 
        <div className='reply-container'>
            <div className='reply-header'>
        <p className='reply-title'>Respond to {currentChatUser}:</p>
        <IoIosClose onClick={closeReply} size={20}/>
            </div>
        <p className='reply'>{reply}</p>
        </div>
        : null}
        <div className='container-box'>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={(emojiObject) => { setMsg((prevMsg) => prevMsg + emojiObject.emoji)}}/>
                }
            </div>
        </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input  type='text' placeholder='Message' value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
            </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-self: end;
.reply-header{
    display:flex;
    justify-content: space-between;
}
.reply-container{
    background-color: white;
    padding: 0 1rem;
}
.reply-title{
        font-size: 0.7rem;
        font-weight: bold;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            font-size: .5rem;
          }
          @media screen and (min-width: 360px) and (max-width: 719px) {
            font-size: .5rem;
          }
}
.reply{
    font-size: 0.8rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        font-size: .8rem;
      }
      @media screen and (min-width: 360px) and (max-width: 719px) {
        font-size: .65rem;
      }
}
    .container-box {
display: flex;
justify-content: space-between;
align-items: center;
background-color: #a9c25d;
gap: 1rem;
padding: 0.55rem 2rem;
// padding-bottom: 0.3rem;
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg {
            font-size: 1.5rem;
            color: #f5eec2;
            cursor: pointer;
        }
        .EmojiPickerReact {
            position: absolute;
            top: -460px;
        }
    }
}
.input-container {
    width: 100%;
    border-radius: 2rem;
    display:flex;
    justify-content: space-between;
    align-items: center;

    background-color: #ffffff;
    input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        border: none;
        padding-left: 1rem;
        font-size: 1rem;
        &::selection {
            background-color: #ffffff32;
        }
        &:focus{
            outline: none;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            font-size: .8rem;
          }
          @media screen and (min-width: 360px) and (max-width: 719px) {
            font-size: .8rem;
          }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        svg {
            font-size: 1.3rem;
            cursor: pointer;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            font-size: .8rem;
            svg {
                font-size: 1.2rem;}
          }
          @media screen and (min-width: 360px) and (max-width: 719px) {
            padding: 0.3rem 1rem;
            svg {
                font-size: 1rem;}
          }
    }
}
}
`;


export default ChatInput