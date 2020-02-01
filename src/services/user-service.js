import Service from './service';

class UserService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/users";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
  //TODO:
  //Add login endpoint
  //Add upgrade endpoint
}

export default UserService;