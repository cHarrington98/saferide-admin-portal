import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import User from './User'
import UserService from '../../apiServices/services/user-service';

class UserList extends Component {
  state = {
    users: [],
    searchString: ''
  }

  constructor() {
    super()
    this.userService = new UserService(process.env.REACT_APP_API_KEY)
    this.getUsers();
  }

  getUsers = () => {
    this.userService.getAll()
    .then((response) => {
      this.setState({users: response})
      console.log("\nResponse:\n")
      console.dir(response);
    })
    .catch((error) => {
      console.log("Error occured while getting all users.")
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        {this.state.users ? (
          <div>
            <br></br>
            <br></br>
            <br></br>
              <Grid container spacing={2} style={{padding: 12}}>
                { this.state.users.map(currentUser => (
                  <Grid key={currentUser.id} item xs={12}>
                    <User user={currentUser} />
                  </Grid>
                ))}
              </Grid>
          </div>
        ) : "No users found."}
      </div>

    )
  }
}

export default UserList;