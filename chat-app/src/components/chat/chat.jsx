import React, { useEffect, useState } from "react";
import { user } from "../join/join";
import socketIO from "socket.io-client";
import "./chat.css";
import Message from "../message/message";
import ReactScrollToBottom from "react-scroll-to-bottom"

let socket;
const ENDPOINT = "http://localhost:5000/";

const char = () => {
  const [id, setid] = useState("")
  const [messages, setmessages] = useState([])
  const send = () => {
    const message = document.getElementById("chatinput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatinput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connection", () => {
      alert("socket is connected");
      
      setid(socket.id)
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userjoined", (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);


  // for display the messages 

  useEffect(()=>{
    socket.on("sendmessage",(data)=>{
      setmessages([...messages, data]);
      console.log(data.user, data.message, data.id)
    })
    return()=>{
   socket.off();
    }
  },[messages])

  return (
    <div className="chatpage">
      <div className="chatcontainer"> 
        <div className="chatheader"></div>
        <ReactScrollToBottom className="chatbox">
         {messages.map((item, i)=> <Message user={item.id===id?"":item.user} message={item.message} classs={item.id===id?"right":"left"} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatinput" />
          <button onClick={send} className="sendbtn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default char;
