import React, { useState } from "react";
import "./Admin.css";
import { FaMoon, FaSun, FaBars, FaHome, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminMessages() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [chatData, setChatData] = useState({
    1: { 
      name: "Ahmed Al-Balushi", 
      messages: [{ sender: "user", text: "Hello, I have a question about my appointment." }] 
    },
    2: { 
      name: "Sara Al-Riyami", 
      messages: [{ sender: "user", text: "Can I change my center?" }] 
    },
    3: { 
      name: "Mazin Al-Harthy", 
      messages: [{ sender: "user", text: "Payment was successful, thank you." }] 
    }
  });

  const handleSend = () => {
    if (replyText.trim() && selectedUserId) {
      const newMessage = { sender: "admin", text: replyText };
      setChatData({
        ...chatData,
        [selectedUserId]: {
          ...chatData[selectedUserId],
          messages: [...chatData[selectedUserId].messages, newMessage]
        }
      });
      setReplyText("");
    }
  };

  const selectedUser = chatData[selectedUserId];

  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <span className="menu-text">Menu</span>
          </div>
          <div className="topbar-center">
            <span className="nav-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
            <span className="nav-item" onClick={() => navigate("/admin/management")}>Admin Management</span>
            <span className="nav-item" onClick={() => navigate("/admin/register-center")}>Register Center</span>
            <span className="nav-item active" onClick={() => navigate("/admin/messages")}>Messages</span>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => navigate("/admin/messages")}><FaEnvelope color="#76a37b" /></button>
            <button className="icon-btn" onClick={() => navigate("/admin/dashboard")}><FaHome /></button>
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="layout">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</div>
              <div className="sidebar-item" onClick={() => navigate("/admin/management")}>Admin Management</div>
              <div className="sidebar-item" onClick={() => navigate("/admin/register-center")}>Register Center</div>
              <div className="sidebar-item active" onClick={() => navigate("/admin/messages")}>Messages</div>
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline style={{marginRight: '8px'}} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <h2 className="title">User Messages</h2>
            
            <div className="dashboard-record-box" style={{ maxWidth: '1000px', display: 'flex', gap: '20px', height: '60vh' }}>
              
              <div className="dashboard-record-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {selectedUserId ? (
                  <>
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Chat with {selectedUser.name}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {selectedUser.messages.map((m, index) => (
                          <div 
                            key={index} 
                            style={{ 
                              alignSelf: m.sender === "admin" ? 'flex-end' : 'flex-start',
                              background: m.sender === "admin" ? '#76a37b' : '#f0f0f0',
                              color: m.sender === "admin" ? 'white' : 'black',
                              padding: '10px 15px',
                              borderRadius: '15px',
                              maxWidth: '70%',
                              fontSize: '14px'
                            }}
                          >
                            {m.text}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <input 
                        type="text" 
                        className="input" 
                        placeholder="Type your reply..." 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      />
                      <button className="remove-btn" style={{ background: '#76a37b', width: '60px' }} onClick={handleSend}>
                        <FaPaperPlane />
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999' }}>
                    Select a user to start chatting
                  </div>
                )}
              </div>

              <div className="dashboard-record-card" style={{ flex: 1, overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '15px' }}>Users List</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Object.keys(chatData).map(id => (
                    <div 
                      key={id} 
                      onClick={() => setSelectedUserId(id)}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        background: selectedUserId === id ? '#76a37b' : '#f5f5f5',
                        color: selectedUserId === id ? 'white' : 'inherit',
                        transition: '0.3s'
                      }}
                    >
                      <strong>{chatData[id].name}</strong>
                      <p style={{ fontSize: '12px', margin: '5px 0 0', opacity: 0.8 }}>
                        {chatData[id].messages[chatData[id].messages.length - 1].text.substring(0, 20)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}