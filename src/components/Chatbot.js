import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Add a default message when the component mounts
    setChatHistory([
      { speaker: "chatbot", text: "Please type your symptoms..." }
    ]);
  }, []);

  const handleUserInput = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5000/api/chatbot", { message });
    console.log(response)
    setChatHistory([
      ...chatHistory,
      { speaker: "user", text: message },
      { speaker: "chatbot", text: response.data.message },
    ]);
    setMessage("");
  };

  return (
    <div className="chatbot-container">
      <button class="chatbot-button" onClick={() => setIsOpen(!isOpen)}><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></button>
      {isOpen && (
        <>
          <div className="chatbot-header">
            <div className="header-left">Chat</div>
            <button className="header-right" onClick={() => setIsOpen(!isOpen)}>
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="csvg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </button>
          </div>
          <div className="chatbot-interface" style={{ width: "350px", height: "500px" }}>
            <ChatHistory chatHistory={chatHistory} />
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input type="text" value={message} onChange={handleUserInput} className="inputb" placeholder="Type a mesage ..." />
            <button type="submit" className="submitbtn" disabled={message.trim().length === 0}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function ChatHistory({ chatHistory }) {
  return (
    <div className="chat-history">
      {chatHistory.map((message, index) => (
        <div className="block">
          <div
            key={index}
            className={
              message.speaker === "user"
                ? "chat-message user"
                : "chat-message chatbot"
            }
          >
            <span className="speaker">{message.speaker}:</span>
            <span className="text">{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chatbot;
