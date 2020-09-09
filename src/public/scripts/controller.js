class Controller {
  constructor(spotifyModel, socketModel, view) {
    this.spotifyModel = spotifyModel;
    this.socketModel = socketModel;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);
  }

  handleSearchButton = (search) => {
    this.spotifyModel.getSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks.tracks.items);
    });
  };

  addTrackToQueue(trackId) {
    console.log("at click");
    this.socketModel.socket.emit("addTrack", { trackId: trackId });
  }
}
