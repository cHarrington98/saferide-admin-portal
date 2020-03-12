import React, { Component } from 'react';
import UserService from  '../../apiServices/services/user-service';
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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: "display",
                  user: this.props.user,
                  updateUser: {}
                };
    this.editMode = this.editMode.bind(this);
    this.delete = this.delete.bind(this);
    this.displayMode = this.displayMode.bind(this);
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.delete = this.delete.bind(this);
    this.userService = new UserService(process.env.REACT_APP_API_KEY);
  }

  render() {
    if(this.state.mode === "display"){
      return(
        <div>
          { this.state.user ? (
            <Card>
              <div className="box2">
              <CardContent>
                <Typography component="p">
                  <b> {this.state.user.firstName + " " + this.state.user.lastName} </b>
                </Typography>
                <Typography component="p">
                  {this.state.user.email}
                </Typography>
                <Typography component="p">
                  {this.state.user.studentNumber}
                </Typography>
                <Typography component="p">
                  {this.state.user.role}
                </Typography>
                <Typography component="p">
                  {this.state.user.verified}
                </Typography>
              </CardContent>
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
    } else if (this.state.mode === "edit") {
      return(
        <div>
          { this.state.user ? (
            <Card>
              <div className="box2">
              <CardContent>
                <Typography component="p">
                  Name: {this.state.user.firstName + " " + this.state.user.lastName}
                </Typography>
                <Typography component="p">
                  Email: {this.state.user.email}
                </Typography>
                <Typography component="p">
                  Student Number: {this.state.user.studentNumber}
                </Typography>
                <Grid container spacing={0} alignItems="flex-end">
                    <Typography component="p">
                      Role:<span>&nbsp;&nbsp;</span>
                    </Typography>
                    <TextField
                      id="updateRole"
                      name="role"
                      value={this.state.updateUser.role}
                      placeholder={this.state.user.role}
                      onChange={this.handleInputChange}
                    />
                </Grid>
                <Typography component="p">
                  Verified: {this.state.user.verified}
                </Typography>
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
                  updateUser: {info: {}}});
  }

  update() {
    this.userService.update(this.state.updateUser, this.state.user.id)
    .then((response) => {
      this.setState({user: response,
                    mode: "display",
                    updateUser: {}})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while updating user.")
      console.log(error);
    })
  }

  delete() {
    this.userService.delete(this.state.user.id)
    .then((response) => {
      this.setState({mode: "deleted"});
    })
    .catch((error) => {
      this.setState({mode: "display"});
      console.log("Error occured while deleting user.")
      console.log(error);
    })
  }

  handleInputChange(event) {
    const target = event.target;
    //Gonna need to do stuff based on type of field later
    const value = target.type === 'number' ? Number(target.value) : target.value;
    //const value = target.value;
    const name = target.name;

    var updateUser = this.state.updateUser;
    updateUser[name] = value;

    this.setState({updateUser});
  }
}

export default User;