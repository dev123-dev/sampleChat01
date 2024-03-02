import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.6.55:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [selectedValue, setSelectedValue] = useState("volvo");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("selectedValue", (data) => {
      setSelectedValue(data);
    });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };

  const changeVal = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    // Emit selected value to server
    socket.emit("selectedValue", newValue);
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <label>Choose a car:</label>

      <select
        name="cars"
        id="cars"
        value={selectedValue}
        onChange={(e) => changeVal(e)}
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default App;
