import Service from './service';

class PickUpPointService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/pickuppoints";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
}

export default PickUpPointService;