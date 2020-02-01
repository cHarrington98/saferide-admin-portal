import Service from './service';
//This endpoint isn't built yet?
//This file could change.
class DriveLogService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/drivelogs";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
}

export default DriveLogService;