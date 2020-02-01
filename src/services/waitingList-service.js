import Service from './service';

class WaitingListService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/waitinglists";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
}

export default WaitingListService;