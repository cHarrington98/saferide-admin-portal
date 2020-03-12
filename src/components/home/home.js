import React, {Component} from 'react';
import ResponsiveCalendarChart from './ResponsiveCalendarChart';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {myData: [
      {
        "day": "2015-04-13",
        "value": 228
      },
      {
        "day": "2017-03-21",
        "value": 191
      },
      {
        "day": "2016-12-05",
        "value": 263
      },
      {
        "day": "2018-06-12",
        "value": 399
      },
      {
        "day": "2016-11-08",
        "value": 358
      },
      {
        "day": "2017-12-07",
        "value": 355
      },
      {
        "day": "2016-01-08",
        "value": 398
      }]
                };
  }

  render(){
    return (<div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {/* <img src={process.env.PUBLIC_URL + '/undraw_all_the_data_h4ki.svg'} />  */}
              <div style={{height: 500}}>
                <ResponsiveCalendarChart data = {this.state.myData} />
              </div>
            </div>);
  }
}

export default Home;