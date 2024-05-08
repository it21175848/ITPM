import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const { name } = useParams();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(name);
  }, [name]);

  const sendMessage = () => {
    const message = { user: username, text: messageInput };
    setMessages([...messages, message]);
    setMessageInput("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const shareLink = () => {
    const shareURL = window.location.origin + "/chatroom/" + username;
    navigator.clipboard.writeText(shareURL);
    alert("Chat room link copied to clipboard!");
  };

  const joinChatRoom = () => {
    if (username.trim() !== "") {
      navigate(`/chatroom/${username}`);
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {username ? (
        <>
          <h1 style={{ marginBottom: "20px" }}>
            Welcome to the Chat Room, {username}!
          </h1>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  {message.user}:{" "}
                </span>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              style={{ padding: "10px", marginRight: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px" }}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={handleUsernameChange}
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={joinChatRoom} style={{ padding: "10px" }}>
            Join Chat Room
          </button>
        </div>
      )}
      <button onClick={shareLink} style={{ padding: "10px" }}>
        Share Chat Room Link
      </button>
    </div>
  );
};

export default ChatRoom;
