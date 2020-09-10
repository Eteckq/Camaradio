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

  handleUpdateTrackList = (queueItems) => {
    console.log("handleUpdateTrackList", queueItems);
    if (queueItems.length === 0) {
      return;
    }

    console.log("updateTrackList", queueItems);
    this.view.displayQueueTableFromTracks(queueItems);
  };

  handleConnect = () => {
    this.service.spotify.getMe().then((user) => {
      this.service.socket.sendHello({
        user: user,
      });
    });
  };

  handleDisconnect = () => {
    console.log("disconnected");
  };

  handleCurrentTrackChange = async (data) => {
    let track = data.queueItem.track;
    let user = data.queueItem.user;
    let position_ms = data.position_ms;

    this.service.spotify.addTrackToQueue(track.uri).then((res) => {
      this.service.spotify.seekToTrackPosition(position_ms);

      this.service.spotify.nextTrack().then((res) => {
        this.service.spotify.startResumePlayback();
      });
    });

    this.view.displayCurrentPlayedTrack(track);
  };

  ///// Functions /////

  addTrackToQueue(trackId) {
    this.service.spotify.getTrackFromId(trackId).then((track) => {
      this.service.socket.sendAddTrack(track);
    });
  }
}
