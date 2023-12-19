import React, { useState, useEffect } from "react";
import styled from "styled-components";
import chat from "../assets/chat.png";

const Contacts = ({ contacts, currentUser, changeChat}) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container>
          <div className="brand">
            <img src={chat} alt="Logo"></img>
            <h3>Hichat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  onClick={()=> changeCurrentChat(index,contact)}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    ></img>
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt=""
              ></img>
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
          <div>
        </div>
            <div></div>
        </Container>
      )}

    </>
  );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
// background-color: black;
.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #39395f;
    gap: 1rem;
    img {
        height: 2rem;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
}
.contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #39395f;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
        background-color: #a9c25d;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        display: flex;
        align-items: center;
        transition: 0.5s ease-in-out;
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
            h3 {
                color: #39395f;
            }
            @media screen and (min-width: 360px) and (max-width: 719px) {
              h3 {
                font-size: 1rem;
              }
            }
        }
    }
    .selected{
        background-color: #73a24e;
    }
}
.current-user {
    background-color: #39395f;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
        @media screen and (min-width: 360px) and (max-width: 719px) {
          img {
            height: 3rem;
          }
        }
    }
    .username {
        h2{
        color: white;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
            h2{
            font-size: 1rem;
            }
        }
      }
      @media screen and (min-width: 360px) and (max-width: 719px) {
        gap: 0.5rem;
        .username {
            h2{
            font-size: 1rem;
            }
        }
      }
}
`;

export default Contacts;
