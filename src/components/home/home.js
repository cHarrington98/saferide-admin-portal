import React, {Component} from 'react';
class Home extends Component {
  render(){
    return (<div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <img src={process.env.PUBLIC_URL + '/SAFERIDE.png'} /> 
            </div>);
  }
}

export default Home;