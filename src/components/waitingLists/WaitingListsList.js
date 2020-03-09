import React, {Component} from 'react';
//import Grid from '@material-ui/core/Grid';
//import WaitingList from './WaitingList';
import { Typography, CardContent, Card } from '@material-ui/core';
import WaitingListService from '../../apiServices/services/waitingList-service';

class WaitingListsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "display",
      pickUpPoint: this.props.pickUpPoint
    }
    this.waitingListService = new WaitingListService(process.env.REACT_APP_API_KEY);
    this.getActiveWL(this.props.pickUpPoint.id);
    this.convertDate = this.convertDate.bind(this);
    this.calculateAverageWaitTime = this.calculateAverageWaitTime.bind(this);
  }

  getActiveWL = (id) => {
    this.waitingListService.getAllActiveByPickUpPointID(id)
    .then((response) => {
      this.setState({waitingListId: response[0].id})
      console.log("\nResponse:\n")
      console.dir(response);
      this.waitingListService.get(this.state.waitingListId)
      .then((response) => {
        this.setState({waitingList: response})
      })
      .catch((error) => {
        console.log("Error occured while getting waitlist by id.")
        console.log(error);
      })
      this.waitingListService.getAllRides(this.state.waitingListId)
      .then((response) => {
        this.setState({rides: response})
      })
      .then(() => {
        this.calculateAverageWaitTime();
      })
      .catch((error) => {
        console.log("Error occured while getting rides by waitlist id.")
        console.log(error);
      })
    })
    .catch((error) => {
      console.log("Error occured while getting all active waiting lists.")
      console.log(error);
    })
  }

  render() {
    if(this.state.mode === "display"){
      return (
        <div>
          { this.state.waitingList && this.state.pickUpPoint ? (
            <Card>
              <div className="box2">
                <CardContent>
                  <Typography component="p">
                    {/* People Waiting, Previous departure, average wait time*/}
                    People Waiting: {this.state.waitingList.totalRiders}
                  </Typography>
                  <Typography component="p">
                    Previous Departure: {this.convertDate(this.state.pickUpPoint.departureTime)}
                  </Typography>
                  <Typography component="p">
                    Average Wait Time: {this.state.averageWaitTime}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ) : null 
          }
        </div>
      )
    }
  }

  convertDate(timeStamp) {
    var date = new Date(timeStamp);
    return date.toString();
  }

  calculateAverageWaitTime() {
    var totalTime = 0;
    var totalRiders = 0;
    var currentTime = new Date();
    this.state.rides.forEach( currentRide => {
      totalTime += (currentTime - (new Date(currentRide.createdAt)))
      console.log(totalTime)
      totalRiders ++
    })
    console.log(totalTime.toString());
    var aveWaitTime = (totalTime /1000 /60 / totalRiders);
    this.setState({averageWaitTime: parseInt(aveWaitTime)})
  }
}

export default WaitingListsList