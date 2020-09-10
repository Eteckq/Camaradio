class SocketService {
  constructor() {
    this.socket = io();
  }

  // BIND EVENTS

  socketConnectEvent(handler) {
    this.socket.on("connect", handler);
  }

  socketDisconnectEvent(handler) {
    this.socket.on("disconnect", handler);
  }

  socketUpdateTrackListEvent(handler) {
    this.socket.on("updateTrackList", handler);
  }

  socketCurrentTrackChange(handler) {
    console.log("socketCurrentTrackChange");
    this.socket.on("currentTrackChange", handler);
  }

  // Functions

  sendHello(data) {
    this.socket.emit("hello", data);
  }

  sendAddTrack(data) {
    this.socket.emit("addTrack", data);
  }
}
