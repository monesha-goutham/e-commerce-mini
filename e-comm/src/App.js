import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "./App.scss";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
  );
}

export default App;
