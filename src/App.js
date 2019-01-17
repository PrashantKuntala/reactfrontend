import React, { Component } from 'react';
// import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './Components/About';
import FAQ from './Components/Faq';
import Downloads from './Components/Downloads';
import Post from './Components/Post';
import LandingPage from './Components/LandingPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



class App extends Component {

  render() {

    // creating a theme with fontfamily changes across the app
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: [ 
      'Roboto Slab', 
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Courier', 'Helvetica' ],
    },
    });

    return (
      <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <CssBaseline /> 
          
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/about' component={About} />
            <Route path='/faq' component={FAQ} />
            <Route path='/downloads' component={Downloads} />
            <Route path="/:post_id" component={Post} />
          </Switch>
        </div>
      </BrowserRouter>  
      </MuiThemeProvider>   
    );
  }
}

export default App;
