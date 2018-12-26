import React, { Component } from 'react';
// import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import FAQ from './Components/Faq';
import Downloads from './Components/Downloads';
import Post from './Components/Post';

// import Search from './Components/Search';
// simple click function to check the api
//  function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//     axios.get('http://localhost:8080/reviewSamples')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   }


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <CssBaseline /> 
          <Navbar />
          {/* Simple button click routing */}
          {/* <Route render={({ history}) => (
        <button
          type='button'
          onClick={() => { history.push('/about') }}
        >
          Go to About !
        </button>
      )} /> */}
      {/* <Search dataSource={dataSource} /> */}
      
      
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About} />
            <Route path='/faq' component={FAQ} />
            <Route path='/downloads' component={Downloads} />
            <Route path="/:post_id" component={Post} />
          </Switch>         
        </div>
      </BrowserRouter>     
    );
  }
}

export default App;
