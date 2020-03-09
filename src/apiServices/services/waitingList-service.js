import Service from '../service';

class WaitingListService extends Service {
  constructor(authKey){
    super(authKey);
    this.url = this.baseUrl + "/api/v1/waitinglists";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }
  
  async getAllActive() {
    console.log(this.constructor.name + ".getAllActive()");
    return fetch(this.url + "?active=true", {
      method: "GET",
      headers: this.headers
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getAllActiveByPickUpPointID(id) {
    console.log(this.constructor.name + "getAllActiveByPickUpPointID(" + id + ")");
    return fetch(this.url + "?active=true&pickUpPointId=" + id, {
      method: "GET",
      headers: this.headers
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getAllRides(id) {
    console.log(this.constructor.name + "getAllRides(" + id + ")");
    return fetch(this.url + "/" + id + "/rides", {
      method: "GET",
      headers: this.headers
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

}

export default WaitingListService;