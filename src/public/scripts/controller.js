class Controller {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);
    this.view.bindPlayBtn(this.handlePlayButton);
    this.view.bindPauseBtn(this.handlePauseButton);

    this.service.socket.socketUpdateTrackListEvent(this.handleUpdateTrackList);
    this.service.socket.socketConnectEvent(this.handleConnect);
    this.service.socket.socketDisconnectEvent(this.handleDisconnect);
  }

  ///// HANDLERS /////

  // DOM Events

  handleSearchButton = (search) => {
    this.service.spotify.getTracksFromSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks.tracks.items);
    });
  };

  handlePlayButton = (search) => {
    this.service.spotify.startResumePlayback();
  };

  handlePauseButton = (search) => {
    this.service.spotify.pausePlayback();
  };

  // SOCKET Events

  handleUpdateTrackList = (tracks) => {
    if (tracks.length === 0) {
      return;
    }

    this.service.spotify
      .getTracksFromTracksId(tracks.map((track) => track.trackId))
      .then((result) => {
        console.log("updateTrackList", result);
        this.view.displayQueueTableFromTracks(result.tracks);
      });
  };

  handleConnect = (data) => {
    this.service.spotify.getMe().then((data) => {
      this.service.socket.sendHello({
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
    this.service.socket.sendAddTrack({ trackId: trackId });
  }
}
