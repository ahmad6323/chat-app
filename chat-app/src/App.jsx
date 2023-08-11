import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import join from "./components/join/join";
import char from "./components/chat/chat";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" Component={join} />
        <Route path="/chat" Component={char} />
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;
