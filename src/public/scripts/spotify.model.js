class SpotifyModel {
  constructor() {}

  getMe() {
    return getApi("me");
  }

  getSearch(query) {
    console.log("search");

    return getApi("search", {
      q: query,
      type: "track",
    });
  }
  // TRACKS

  getTrackFromId(trackId) {
    return getApi("tracks/" + trackId);
  }

  // USERS

  getUserFromId(userId) {
    return getApi("users/" + userId);
  }
}

// To delete

function getTracksFromTracksId(tracksId) {
  console.log("getTracksFromTracksId");

  return getApi("tracks", {
    ids: tracksId.join(","),
  });
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
