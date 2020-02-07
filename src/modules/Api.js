export class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }
  getData(path) {
    return fetch(`${this.url}${path}`, {
                  headers: this.headers
               })
                 .then(this.checkRes)
                 .catch(this.showError);
  }
  patch(path, object) {
    return fetch(`${this.url}${path}`, {
                  method: 'PATCH',
                  headers: this.headers,
                  body: JSON.stringify(object)
               })
                 .then(this.checkRes)
                 .catch(this.showError);
  }
  sendData(path, object) {
    return fetch(`${this.url}${path}`, {
                  method: 'POST',
                  headers: this.headers,
                  body: JSON.stringify(object)
               })
                 .then(this.checkRes)
                 .catch(this.showError);
  }
  delete(path) {
    return fetch(`${this.url}${path}`, {
                  method: 'DELETE',
                  headers: this.headers,
               })
                 .then(this.checkRes)
                 .catch(this.showError);
  }
  put(path) {
    return fetch(`${this.url}${path}`, {
                  method: "PUT",
                  headers: this.headers
               })
                  .then(this.checkRes)
                  .catch(this.showError);
  }
  checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
  showError(err){
    console.log(`Ошибка: ${err}`);
  }
}
