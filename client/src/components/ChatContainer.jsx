import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { Messages } from "./Messages";
import { v4 as uuidv4 } from "uuid";


const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [reply, setReply] = useState();

  const swipeToReply = (message, fromSelf) =>{
    setReply(message.length> 50 ? message.slice(0,5) + '...' : message)
    console.log(reply, fromSelf);
  }
  const closeReply = () => {
    setReply("");
  }

  useEffect(() => {
    const fetchChat = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          to: currentChat._id,
          from: currentUser._id,
        });
        setMessages(response.data);
      }
    };
    fetchChat();
  }, [currentChat]);

  // msg from ChatInput.jsx and socket.io handling
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {
        console.log({ message });
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                ></img>
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
               <Messages
               key={uuidv4()}
               scrollRef={scrollRef}
               fromSelf = {message.fromSelf}
               message={message.message}
               swipeToReply={swipeToReply}
               />
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} reply={reply} closeReply={closeReply} currentChatUser={currentChat.username}/>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #a9c25d;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
        @media screen and (min-width: 360px) and (max-width: 719px) {
          img {
            height: 2rem;
          }
        }
      }
      .username {
        overflow: hidden;
        color: #39395f;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
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
  }
`;

export default ChatContainer;
