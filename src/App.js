import React, {Component} from 'react';
import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/nav-bar/nav-bar";

class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <ToastContainer/>
      </div>
    );
  }
}

export default App;