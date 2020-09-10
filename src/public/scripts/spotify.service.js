class SpotifyService {
  constructor() {}

  // TRACKS

  getTracksFromSearch(query) {
    console.log("search");

    return getApi("search", {
      q: query,
      type: "track",
    });
  }

  getTrackFromId(trackId) {
    return getApi("tracks/" + trackId);
  }

  // To delete
  getTracksFromTracksId(tracksId) {
    console.log("getTracksFromTracksId");

    return getApi("tracks", {
      ids: tracksId.join(","),
    });
  }

  // USERS

  getMe() {
    return getApi("me");
  }

  getUserFromId(userId) {
    return getApi("users/" + userId);
  }

  // AUTH

  refreshToken() {
    return $.get({
      url: "/api/auth/refresh",
    }).catch((error) => {
      console.log(error);
    });
  }

  // PLAYER

  startResumePlayback() {
    return getApi("me/player/play");
  }

  pausePlayback() {
    return getApi("me/player/pause");
  }

  previousTrack() {
    return getApi("me/player/next");
  }

  nextTrack() {
    return getApi("me/player/next");
  }

  getCurrentTrack() {
    return getApi("me/player/currently-playing");
  }
}

function getApi(endpoint, data = null) {
  let accessToken = getAccessToken();
  return $.get({
    url: "https://api.spotify.com/v1/" + endpoint,
    headers: { Authorization: "Bearer " + accessToken },
    data: data,
  }).catch((error) => {
    console.log(error);
  });
}

function getAccessToken() {
  return getCookie("access_token");
}

function getRefreshToken() {
  return getCookie("refresh_token");
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
