import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Car from './Car'
import CarService from  '../../apiServices/services/car-service';

class CarList extends Component {
  state = {
    cars: [],
    searchString: ''
  }

  constructor() {
    super()
    this.carService = new CarService(process.env.REACT_APP_API_KEY);
    this.getCars();
  }

  getCars = () => {
    this.carService.getAll()
    .then((response) => {
      this.setState({cars: response})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while getting all cars.")
      console.log(error);
    })
  }

  onSearchInputChange = (event) => {
    if (event.target.value) {
      this.setState({searchString: event.target.value})
    } else {
      this.setState({searchString: ''})
    }
    this.getCars()
  }

  render() {
    return (
      <div>
        {this.state.cars ? (
          <div>
            <br></br>
            <br></br>
            <TextField style={{padding: 24}}
              id="searchInput"
              placeholder="Search for Cars"
              margin="normal"
              onChange={this.onSearchInputChange}
            />
            <Grid container spacing={2} style={{padding: 12}}>
              { this.state.cars.map(currentCar => (
                <Grid key={currentCar.id} item xs={12}>
                  <Car car={currentCar} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : "No cars found."}
      </div>

    )
  }
}

export default CarList;