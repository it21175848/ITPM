import axios from "axios";
import { useState } from "react";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:3001/authenticate", { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("Auth Error", e));
  };

  const handleShare = () => {
    const shareURL = window.location.href;
    const shareMessage = `Join my chat room: ${shareURL}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Share Chat Room",
        text: shareMessage
      })
      .catch((error) => console.log("Share Error", error));
    } else {
      // Fallback if Web Share API is not supported
      // You can implement other sharing options here
      alert("Share Chat Room: " + shareURL);
    }
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input
            className="auth-input"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="auth-button" type="submit">
            Enter
          </button>

          <hr /> 

          {/* Share button */}
          <button className="share-button" onClick={handleShare}>
            Share Chat Room
          </button>
        </div>
      </form>

    </div>
  );
};

export default AuthPage;
