import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);

  const navigate = useNavigate();

  //checks to see if the user is logged in.
  useEffect(() => {
    const loginRedirect = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setisLoaded(true);
      }
    };
    loginRedirect();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      console.log("Socket: ", socket.current, " CurrentUser: ", currentUser._id)
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  //fetching all the users in the database.
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          {/* The contacts prop fetched from the database and saved in the 'contacts' variable is sent to the Contacts component,
            along with the currentUser which was fetched from the localStorage.
            The changeChat prop gets the contact that user clicks on to view.*/}
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #416a59;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #f5eec2;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 719px) {
      grid-template-columns: 40% 60%;
    }
  }
`;

export default Chat;
