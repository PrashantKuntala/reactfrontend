import React, { Component } from 'react';
import axios from 'axios';


// simple click function to check the api
 function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    axios.get('http://localhost:8080/reviewSamples')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  }


class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Simple React App</h1>
        <br/>
        <button onClick={handleClick}>
        Click me
        </button>        
      </div>
    );
  }
}

export default App;
