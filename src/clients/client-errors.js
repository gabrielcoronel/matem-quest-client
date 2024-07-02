export class HTTPError {
  constructor(data) {
    this.data = data
    this.type = "HTTPError"
  }
}

export class ServerError {
  constructor(data) {
    this.data = data
    this.type = "ServerError"
  }
}
