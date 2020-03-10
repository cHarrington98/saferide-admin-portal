import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import PickUpPoint from './PickUpPoint'
import PickUpPointService from  '../../apiServices/services/pickUpPoint-service';

class PickUpPointList extends Component {
  state = {
    pickUpPoints: []
  }

  constructor() {
    super()
    this.pickUpPointService = new PickUpPointService(process.env.REACT_APP_API_KEY);
    this.getPickUpPoints();
  }

  getPickUpPoints = () => {
    this.pickUpPointService.getAll()
    .then((response) => {
      this.setState({pickUpPoints: response})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while gettting all cars.")
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
              { this.state.pickUpPoints.map(currentPickUpPoint => (
                <Grid key={currentPickUpPoint.id} item xs={6} display="inline">
                  <PickUpPoint pickUpPoint={currentPickUpPoint} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : "No pick up points found."}
      </div>

    )
  }
}

export default PickUpPointList;