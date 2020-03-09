import React, {Component} from 'react';
import PickUpPointService from '../../apiServices/services/pickUpPoint-service';
import WaitingListsList from './WaitingListsList';
import { Grid } from '@material-ui/core';

/*

*/
class WaitingListsTopLevel extends Component {
  state = {
    pickUpPoints: [],
  }

  constructor() {
    super()
    this.pickUpPointService = new PickUpPointService(process.env.REACT_APP_API_KEY);
    this.getAllPickUpPoints();
  }

  getAllPickUpPoints = (id) => {
    this.pickUpPointService.getAll()
    .then((response) => {
      console.log("\nResponse:\n")
      console.dir(response);
      this.setState({pickUpPoints: response})
    })
    .catch((error) => {
      console.log("Error occured while getting all the pick up points.")
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        {this.state.pickUpPoints ? (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <Grid container spacing={2} style={{padding: 12}}>
              { this.state.pickUpPoints.map(currentPUP => (
                <Grid key={currentPUP.id} item xs={12}>
                  <h1> {currentPUP.title} </h1>
                  <WaitingListsList pickUpPoint={currentPUP}/>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : "No waiting lists as their are no pick up points."}
      </div>
    )
  }
}

export default WaitingListsTopLevel;