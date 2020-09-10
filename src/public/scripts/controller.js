class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);

    this.model.socket.socketUpdateTrackListEvent(this.handleUpdateTrackList);
    this.model.socket.socketConnectEvent(this.handleConnect);
    this.model.socket.socketDisconnectEvent(this.handleDisconnect);
  }

  ///// HANDLERS /////

  // DOM Events

  handleSearchButton = (search) => {
    this.model.spotify.getTracksFromSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks.tracks.items);
    });
  };

  // SOCKET Events

  handleUpdateTrackList = (tracks) => {
    if (tracks.length === 0) {
      return;
    }

    this.model.spotify
      .getTracksFromTracksId(tracks.map((track) => track.trackId))
      .then((result) => {
        console.log("updateTrackList", result);
        this.view.displayQueueTableFromTracks(result.tracks);
      });
  };

  handleConnect = (data) => {
    this.model.spotify.getMe().then((data) => {
      this.model.socket.sendHello({
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
    this.model.socket.sendAddTrack({ trackId: trackId });
  }
}
