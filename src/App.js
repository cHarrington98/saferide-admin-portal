import React, { Component } from 'react';
import './App.css';
//import NavBar from './components/NavBar';
import PermanentDrawerLeft from './components/Drawer';
import Main from './components/Main';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <div className="box">
          <div>
            <PermanentDrawerLeft/>
          </div>
          <div className="grow">
            <Main/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
