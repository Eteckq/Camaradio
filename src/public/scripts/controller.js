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
    this.service.socket.socketCurrentTrackChange(this.handleCurrentTrackChange);
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
    console.log("handleUpdateTrackList", tracks);
    if (tracks.length === 0) {
      return;
    }

    console.log("updateTrackList", tracks);
    this.view.displayQueueTableFromTracks(tracks);
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

  handleCurrentTrackChange = async (data) => {
    console.log("current track change");

    await this.service.spotify.addTrackToQueue(data.track.uri);

    console.log("after addTrackToQueue");

    await this.service.spotify.seekToTrackPosition(data.position_ms);

    console.log("after seekToTrackPosition");

    this.view.displayCurrentPlayedTrack();
  };

  ///// Functions /////

  addTrackToQueue(trackId) {
    this.service.spotify.getTrackFromId(trackId).then((track) => {
      this.service.socket.sendAddTrack(track);
    });
  }
}
