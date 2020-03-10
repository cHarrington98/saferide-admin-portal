import React, { Component } from 'react';
import PickUpPointService from  '../../apiServices/services/pickUpPoint-service';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import TextField from '@material-ui/core/TextField';
import DoneSharp from '@material-ui/icons/DoneOutlined';
import CloseSharp from '@material-ui/icons/CloseOutlined';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import '../../App.css';

const styles = theme => ({
  root: {
    width: 480,
  },
  media: {
    height: 250,
  },
});

class PickUpPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: "display",
                  pickUpPoint: this.props.pickUpPoint,
                  updatePickUpPoint: {}
                };

    this.editMode = this.editMode.bind(this);
    this.delete = this.delete.bind(this);
    this.displayMode = this.displayMode.bind(this);
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.delete = this.delete.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.pickUpPointService = new PickUpPointService(process.env.REACT_APP_API_KEY);
    this.getImage = this.getImage.bind(this);
  }

  render() {
    const { classes } = this.props;
    if(this.state.mode === "display"){
      return(
        <div>
          { this.state.pickUpPoint ? (
            <Card className={classes.root}>
              <CardMedia
                  image={process.env.PUBLIC_URL + this.getImage(this.state.pickUpPoint.abbreviation)}
                  title="Map"
                  className={classes.media}
              />
              <div className="box2">
              <CardContent>
                <Typography variant="h5">
                  <b> {this.state.pickUpPoint.title} </b>
                </Typography>
                <Typography color="textSecondary" variant="subtitle">
                  {this.state.pickUpPoint.abbreviation}
                </Typography>
                <br></br>
                <br></br>
                <Typography color="textSecondary">
                  Last Departure
                </Typography>
                <Typography component="p" variant="h5" color='primary' display="inline">
                  <b>{this.convertDate(this.state.pickUpPoint.departureTime)[0]}</b> 
                </Typography>
                <Typography color="textSecondary" variant="subtitle" display="inline">
                  {' '}{this.convertDate(this.state.pickUpPoint.departureTime)[1]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" color="primary" onClick={this.editMode}>
                  <Edit/>
                </Button>
                <Button size="medium" color="primary" onClick={this.delete}>
                  <Delete/>
                </Button>
              </CardActions>
              </div>
            </Card>
          ): null }
        </div>
    )
    } else if (this.state.mode === "edit") {
      return(
        <div>
          { this.state.pickUpPoint ? (
            <Card>
              <div className="box2">
              <CardContent>
                <Grid container spacing={0} alignItems="flex-end">
                    <TextField
                      id="updateTitle"
                      name="title"
                      value={this.state.updatePickUpPoint.title}
                      placeholder={this.state.pickUpPoint.title}
                      onChange={this.handleInputChange}
                    />
                </Grid>
                <Grid container spacing={0} alignItems="flex-end">
                    <TextField
                      id="updateAbbreviation"
                      name="abbreviation"
                      value={this.state.updatePickUpPoint.abbreviation}
                      placeholder={this.state.pickUpPoint.abbreviation}
                      onChange={this.handleInputChange}
                    />
                </Grid>
                <Grid container spacing={0} alignItems="flex-end">
                    <Typography component="p">
                      Location ID:<span>&nbsp;&nbsp;</span>
                    </Typography>
                    <TextField
                      style={{color:'#E7542B'}}
                      id="updateLocationId"
                      name="locationId" 
                      value={this.state.updatePickUpPoint.locationId}
                      placeholder={(this.state.pickUpPoint.locationId).toString()}
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
    this.pickUpPointService.update(this.state.updatePickUpPoint, this.state.pickUpPoint.id)
    .then((response) => {
      this.setState({pickUpPoint: response,
                    mode: "display",
                    updatePickUpPoint: {}})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while updating pick up point.")
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
      console.log("Error occured while deleting pick up point.")
      console.log(error);
    })
  }

  handleInputChange(event) {
    const target = event.target;
    //Gonna need to do stuff based on type of field later
    const value = target.name === 'locationId' ? Number(target.value) : target.value;
    //const value = target.value;
    const name = target.name;

    var updatePickUpPoint = this.state.updatePickUpPoint;
    updatePickUpPoint[name] = value;

    this.setState({updatePickUpPoint});
  }

  convertDate(timeStamp) {
    return moment(timeStamp).format('LT').split(" ");
  }

  getImage(pickUpPointName) {
    var imgStr = pickUpPointName.replace(' ','');
    return imgStr + ".png";
  }
}

PickUpPoint.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PickUpPoint);