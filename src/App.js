import React, {Component} from 'react';
import {findSolutionByNewton} from "./service/task1";
import './App.css';

class App extends Component {
  componentDidMount() {
    findSolutionByNewton({min: 0, max: 2}, 0.0001).then(r => console.log(r))
  }

  render() {
    return (
        <div>

        </div>
    );
  }
}

export default App;