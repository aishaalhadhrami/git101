import React, { useState } from "react";
import CustomerLayout from "./CustomerLayout";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import "./Customer.css";

export default function Chatbot() {
  const [message, setMessage] = useState("");

  const quickQuestions = [
    "HOW TO REFUND?",
    "CAN I CHANGE CENTER AFTER PAYMENT ?",
    "HOW DO I RECEIVE THE REFUND?",
    "HOW CAN I EDIT MY PROFILE INFORMATION?",
  ];

  return (
    <CustomerLayout>
      <div className="chatbot-content">
        <TbMessageChatbotFilled className="chatbot-main-icon" />

        <h1>Contact with Admin</h1>
        <p>How can I help you?</p>

        <div className="chatbot-input-box">
          <input
            type="text"
            placeholder="HOW CAN I HELP YOU?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          
        </div>

        <div className="quick-questions">
          {quickQuestions.map((q, index) => (
            <button key={index} type="button">
              {q}
            </button>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}