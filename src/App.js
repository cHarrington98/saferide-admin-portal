import React, { Component } from 'react';
import './App.css';
//import NavBar from './components/NavBar';
import PermanentDrawerLeft from './components/Drawer';
import Main from './components/Main';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import './App.css'

class App extends Component {
  render() {
    const grayTheme = createMuiTheme({
      palette: {
        primary: {
          main: '#E7542B'
        },
        text: {
          primary: grey[700],
          secondary: grey[500],
          orange: '#E7542B'
        }
      },
      typography: {
        h6Title: {
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: "2.0rem",
          lineHeight: 0.5,
          letterSpacing: "0.00em"
        },
        h5: {
          lineHeight: 0.5,
        },
      }
    });
    return (
      <div>
        <div className="box">
          <div>
            <PermanentDrawerLeft/>
          </div>
          <MuiThemeProvider theme={grayTheme}>
          <div className="grow">
            <Main/>
          </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default withStyles({ withTheme: true })(App);
