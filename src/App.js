import React, {Component} from 'react';
import './App.css';
import Task1 from "./components/task1/task1";
import Task2 from "./components/task2/task2";
import Task3 from "./components/task3/task3";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  render() {
    return (
      <div>
        <Task3/>
        <ToastContainer/>
      </div>
    );
  }
}

export default App;