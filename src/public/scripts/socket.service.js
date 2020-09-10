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

  // Functions

  sendHello(data) {
    this.socket.emit("hello", data);
  }

  sendAddTrack(track) {
    this.socket.emit("addTrack", {
      track: track,
    });
  }
}
