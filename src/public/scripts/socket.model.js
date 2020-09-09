class SocketModel {
  constructor() {
    this.socket = io();

    this.socket.on("connect", () => {
      app.spotifyModel.getMe().then((data) => {
        this.socket.emit("hello", {
          id: data.id,
          name: data.display_name,
        });
      });
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });

    this.socket.on("updateTrackList", (tracks) => {
      console.log("updateTrackList", tracks);
      if (tracks.length === 0) {
        return;
      }

      app.view.displayQueueTableFromTracks(tracks);
    });
  }
}
