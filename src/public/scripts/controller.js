class Controller {
  timelineInterval = null;

  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.view.bindSearchButton(this.handleSearchButton);
    this.view.bindSearchBar(this.handleSearchBar);

    this.view.bindMenuButton(this.handleMenuButton);
    this.view.bindBackToHomeButton(this.handleBackToHomeButton);

    this.service.socket.socketUpdateTrackListEvent(this.handleUpdateTrackList);
    this.service.socket.socketConnectEvent(this.handleConnect);
    this.service.socket.socketDisconnectEvent(this.handleDisconnect);
    this.service.socket.socketCurrentTrackChange(this.handleCurrentTrackChange);
    this.service.socket.socketUserHateTrackEvent(this.handleUserHateTrack);

    this.service.socket.socketUpdateConnectedUsersList(
      this.handleCurrentUserListChange
    );

    setInterval(() => {
      console.log("refresh token");
      this.service.spotify.refreshToken();
    }, 90000);
  }

  ///// HANDLERS /////

  // DOM Events

  // Page 1

  handleSearchButton = () => {
    this.view.displaySearchPage();
  };

  handleMenuButton = () => {
    this.view.displayMenuPage();
  };

  handleHateTrackButton = (trackId) => {
    this.service.socket.sendHateTrack(trackId);
  };

  handleMuteCurrentTrackButton = () => {
    console.log("MUTE PLAYER");
    this.service.spotify.pausePlayback();
  };

  // Page 2

  handleBackToHomeButton = () => {
    this.view.displayHomePage();
  };

  handleSearchBar = (search) => {
    this.service.spotify.getTracksFromSearch(search).then((tracks) => {
      this.view.displaySearchResult(tracks);
    });
  };

  // SOCKET Events

  handleUpdateTrackList = (queueItems) => {
    if (queueItems.length === 0) {
      this.view.clearQueueTable();
      return;
    }

    this.view.displayQueueTableFromTracks(queueItems);

    this.view.bindHateTrackButton(this.handleHateTrackButton);
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

    this.service.spotify.changeTrack(track.uri, position_ms);

    /* this.service.spotify.addTrackToQueue(track.uri).then((res) => {
      this.service.spotify.nextTrack().then((res) => {
        this.service.spotify.seekToTrackPosition(position_ms);
        this.service.spotify.startResumePlayback();
      });
    }); */

    this.view.displayCurrentPlayedTrack(track, user);
    this.view.bindHateCurrentTrackButton(this.handleHateCurrentTrackButton);
    this.view.bindMuteCurrentTrackButton(this.handleMuteCurrentTrackButton);

    this.startTimeline(position_ms, track.duration_ms);
  };

  handleUserHateTrack = (data) => {
    console.log("data");
    console.log(data);

    const trackId = data.track.id;
    console.log("Someone hate " + trackId);

    this.view.displayHaterAnimation(data.track, data.user);
  };

  handleHateCurrentTrackButton = () => {
    this.service.socket.sendHateCurrentTrack();
  };

  handleCurrentUserListChange = async (users) => {
    this.view.displayCurrentUsersList(users);
  };
  ///// Functions /////

  addTrackToQueue(trackId) {
    this.service.spotify.getTrackFromId(trackId).then((track) => {
      this.service.socket.sendAddTrack(track);
    });

    this.view.displayHomePage();
  }

  startTimeline(position_ms, duration_ms) {
    clearInterval(this.timelineInterval);

    let started = Date.now();
    let timeline = position_ms;

    this.timelineInterval = setInterval(() => {
      timeline = position_ms + Date.now() - started;
      if (timeline > duration_ms) {
        clearInterval(this.timelineInterval);
      }
      this.view.setTimelinePercentage((timeline / duration_ms) * 100);
    }, 250);
  }
}
