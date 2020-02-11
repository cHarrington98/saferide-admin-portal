import Service from '../service';

class CarService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/cars";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
}

export default CarService;