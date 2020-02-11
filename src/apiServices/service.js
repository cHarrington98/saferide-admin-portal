//This is a parent class for a service.
//When you create a service it should be a child of this class.
//Where you only need to create a constructor.
//You may also override these methods or add extras.
//This Parent Service considers the basic REST methods.
class Service {

  constructor(authKey) {
    //authKey will be passed in from localStorage.
    this.authKey = authKey;
    //Here we can define which baseURL we want to use.
    //You should create it in .env and then set it below.
    //Ex: this.baseUrl = process.env.REACT_APP_SAFERIDE_API_BASE_URL_STAGING;
    this.baseUrl = process.env.REACT_APP_SAFERIDE_API_BASE_URL_STAGING;
    //Extension of baserURL cars example below.
    //this.url = this.baseUrl + "/api/v1/cars";
    this.headers = {
      "Authorization": this.authKey,
      "Content-Type": "application/json",
    };
  }

  async getAll() {
    console.log(this.constructor.name + ".getAll()");
    return fetch(this.url, {
      method: "GET",
      headers: this.headers,
      mode: "cors"
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

  async get(id) {
    console.log(this.constructor.name + ".get(" + id + ")");
    return fetch(this.url + "/" + id, {
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

  async create(createBody) {
    console.log(this.constructor.name + ".create()");
    return fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(createBody)
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

  async update(updateBody, id) {
    console.log(this.constructor.name + ".update(" + id + ")");
    return fetch(this.url + "/" + id, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(updateBody)
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

  async delete(id) {
    console.log(this.constructor.name + ".delete(" + id + ")");
    return fetch(this.url + "/" + id, {
      method: "DELETE",
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


  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }

}

export default Service;