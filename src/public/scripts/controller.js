class Controller {
  constructor(spotifyModel, socketModel, view) {
    this.spotifyModel = spotifyModel;
    this.socketModel = socketModel;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);
    this.view.bindPlayBtn(this.handlePlayButton);
    this.view.bindPauseBtn(this.handlePauseButton);

    this.socketModel.socketUpdateTrackListEvent(this.handleUpdateTrackList);
    this.socketModel.socketConnectEvent(this.handleConnect);
    this.socketModel.socketDisconnectEvent(this.handleDisconnect);
  }

  ///// HANDLERS /////

  // DOM Events

  handleSearchButton = (search) => {
    this.spotifyModel.getTracksFromSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks.tracks.items);
    });
  };

  handlePlayButton = (search) => {
    this.spotifyModel.startResumePlayback();
  };

  handlePauseButton = (search) => {
    this.spotifyModel.pausePlayback();
  };

  // SOCKET Events

  handleUpdateTrackList = (tracks) => {
    if (tracks.length === 0) {
      return;
    }

    this.spotifyModel
      .getTracksFromTracksId(tracks.map((track) => track.trackId))
      .then((result) => {
        console.log("updateTrackList", result);
        this.view.displayQueueTableFromTracks(result.tracks);
      });
  };

  handleConnect = (data) => {
    this.spotifyModel.getMe().then((data) => {
      this.socketModel.sendHello({
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
    this.socketModel.sendAddTrack({ trackId: trackId });
  }
}
