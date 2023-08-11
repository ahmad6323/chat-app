import React, { useState } from "react";
import "./join.css";
import { Link } from "react-router-dom";
let user 

const joinchat = ()=>{
  user =  document.getElementById("joinInput").value
  document.getElementById("joinInput").value="";
   
 }

const join = () => {
  const [name, setname] = useState("");

  return (
    <div className="joinpage">
      <div className="joincontainer">
        <h1>join page</h1>
        <input onChange={(e)=>setname(e.target.value)} type="text" id="joinInput"  placeholder="enter your name "/>
        <Link onClick={(event)=> !name ? event.preventDefault():null} to={"/chat"}><button onClick={joinchat} className="joinBtn">login</button></Link>
      </div>
    </div>
  );
};

export default join ;
export{user}
