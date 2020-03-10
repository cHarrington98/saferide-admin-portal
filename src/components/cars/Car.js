import React, { Component } from 'react';
import CarService from  '../../apiServices/services/car-service';
import PickUpPointService from '../../apiServices/services/pickUpPoint-service';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import TextField from '@material-ui/core/TextField';
import DoneSharp from '@material-ui/icons/DoneOutlined';
import CloseSharp from '@material-ui/icons/CloseOutlined';
import Grid from '@material-ui/core/Grid';
import '../../App.css';

//A react class component.
class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: "display",
                  car: this.props.car,
                  pickUpPoint: {},
                  updateCar: {info: {}}
                };
    //Need to bind these so they can be called via onClick
    this.editMode = this.editMode.bind(this);
    this.delete = this.delete.bind(this);
    this.displayMode = this.displayMode.bind(this);
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.delete = this.delete.bind(this);
    this.carService = new CarService(process.env.REACT_APP_API_KEY);
    this.pickUpPointService = new PickUpPointService(process.env.REACT_APP_API_KEY);
    this.getPickUpPoint(this.state.car.pickUpPointId);
  }

  getPickUpPoint = (id) => {
    this.pickUpPointService.get(id)
    .then((response) => {
      this.setState({pickUpPoint: response})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while pickuppoint by ID.")
      console.log(error);
    })
  }

  //This function is called when we use <CarList /> in upper levels.
  render() {
    //Notice here how I've made a state var named mode to reflect what we want
    //the user to see.
    if(this.state.mode === "display"){
      return(
        <div>
          { this.state.car ? (
            <Card>
              <div className="box2">
              <CardContent>
                <Typography component="p">
                  <b>{this.state.pickUpPoint.title}</b>
                </Typography>
                {/* I can set the background color below */}
                <Typography component="p" style={{ backgroundColor: '' }}>
                  {this.state.car.status}
                </Typography>
              </CardContent>
              {/* Would be cool if we moved the CardActions into their own component and passed the onClick methods as props */}
              <CardActions>
                <Button size="medium" color="primary" onClick={this.editMode} style={{color:'#E7542B'}}>
                  <Edit/>
                </Button>
                <Button size="medium" color="primary" onClick={this.delete} style={{color:'#E7542B'}}>
                  <Delete/>
                </Button>
              </CardActions>
              </div>
            </Card>
          ): null }
        </div>
    )
    //Edit mode.
    } else if (this.state.mode === "edit") {
      return(
        <div>
          { this.state.car ? (
            <Card>
              <div className="box2">
              <CardContent>
                <Typography component="p">
                  ID: {this.state.car.id}
                </Typography>
                <Grid container spacing={0} alignItems="flex-end">
                    <Typography component="p">
                      Status:<span>&nbsp;&nbsp;</span>
                    </Typography>
                    <TextField
                      id="updateStatus"
                      name="status"
                      value={this.state.updateCar.status}
                      placeholder={this.state.car.status}
                      onChange={this.handleInputChange}
                    />
                </Grid>
                <Grid container spacing={0} alignItems="flex-end">
                    <Typography component="p">
                    Device ID:<span>&nbsp;&nbsp;</span>
                    </Typography>
                    <TextField
                      id="updateDeviceID"
                      name="deviceID"
                      value={this.state.updateCar.deviceID}
                      placeholder={this.state.car.deviceID}
                      onChange={this.handleInputChange}
                    />
                </Grid>
                {/*We need to grab all of the pick up points and list them by name here.*/}
                <Grid container spacing={0} alignItems="flex-end">
                    <Typography component="p">
                    Pick Up Point ID:<span>&nbsp;&nbsp;</span>
                    </Typography>
                    <TextField
                      style={{color:'#E7542B'}}
                      id="updatePickUpPointID"
                      name="pickUpPointId"
                      value={this.state.updateCar.pickUpPointId}
                      placeholder={(this.state.car.pickUpPointId).toString()}
                      onChange={this.handleInputChange}
                    />
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="medium" color="primary" onClick={this.update} style={{color:'#E7542B'}}>
                  <DoneSharp/>
                </Button>
                <Button size="medium" color="primary" onClick={this.displayMode} style={{color:'#E7542B'}}>
                  <CloseSharp/>
                </Button>
              </CardActions>
              </div>
            </Card>
          ): null }
        </div>
    )
    } else if (this.state.mode === "deleted") {
      return (
        //You can't really delete a react component and I don't want to force a refresh.
        //Because this component is rendered up a level in Main.js.
        <div>
        </div>
      )
    }
  }

  editMode() {
    this.setState({mode: "edit"});
  }

  displayMode() {
    this.setState({mode: "display",
                  updateCar: {info: {}}});
  }

  update() {
    this.carService.update(this.state.updateCar, this.state.car.id)
    .then((response) => {
      this.setState({car: response,
                    mode: "display",
                    updateCar: {info: {}}})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while updating car.")
      console.log(error);
    })
  }

  delete() {
    this.carService.delete(this.state.car.id)
    .then((response) => {
      this.setState({mode: "deleted"});
    })
    .catch((error) => {
      this.setState({mode: "display"});
      console.log("Error occured while deleting car.")
      console.log(error);
    })
  }

  //React wants us to handle what's in the textFields at all times.
  //So we can't just wait for the confirm button to grab what's in the text fields.
  //This is why we define a state var updateCar to hold these new values.
  handleInputChange(event) {
    const target = event.target;
    //Gonna need to do stuff based on type of field later
    const value = target.name === 'pickUpPointId' ? Number(target.value) : target.value;
    //const value = target.value;
    const name = target.name;

    var updateCar = this.state.updateCar;
    updateCar[name] = value;

    this.setState({updateCar});
  }
}

export default Car;