import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getSentencePermutationsVector } from "./utils/getSentencePermutationsVector";
import { getRelevantPapers } from "./utils/getRelevantPapers";

class App extends Component {
  render() {
    // const vec = getSentencePermutationsVector("Biomedical applications of Raman and infrared spectroscopy to diagnose tissues")
    // console.log(vec)
    console.log(getRelevantPapers())
    return (
      <div className="App">
        <p>Hello</p>
      </div>
    );
  }
}

export default App;
