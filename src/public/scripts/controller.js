class Controller {
  constructor(spotifyModel, socketModel, view) {
    this.spotifyModel = spotifyModel;
    this.socketModel = socketModel;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);

    this.socketModel.socketUpdateTrackListEvent(this.handleUpdateTrackList);
    this.socketModel.socketConnectEvent(this.handleConnect);
    this.socketModel.socketDisconnectEvent(this.handleDisconnect);
  }

  ///// HANDLERS /////

  // DOM Events

  handleSearchButton = (search) => {
    this.spotifyModel.getSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks.tracks.items);
    });
  };

  // SOCKET Events

  handleUpdateTrackList = (tracks) => {
    console.log("updateTrackList", tracks);
    if (tracks.length === 0) {
      return;
    }

    this.view.displayQueueTableFromTracks(tracks);
  };

  handleConnect = (data) => {
    this.spotifyModel.getMe().then((data) => {
      this.socketModel.emit("hello", {
        id: data.id,
        name: data.display_name,
      });
    });
  };

  handleDisconnect = () => {
    console.log("disconnected");
  };

  ///// Functions /////

  addTrackToQueue(trackId) {
    console.log("at click");
    this.socketModel.emit("addTrack", { trackId: trackId });
  }
}
