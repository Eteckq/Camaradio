function getMe() {
  return fetch("me");
}

function search(searchValue) {
  console.log("search");
  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/search",
    headers: { Authorization: "Bearer " + accessToken },
    data: {
      q: searchValue,
      type: "track",
    },
  }).catch((error) => {
    console.log(error);
  });
}

function getTracksFromTracksId(tracksId) {
  console.log("getTracksFromTracksId");
  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/tracks",
    headers: { Authorization: "Bearer " + accessToken },
    data: {
      ids: tracksId.join(","),
    },
  }).catch((error) => {
    console.log(error);
  });
}

function fetch(endpoint) {
  let accessToken = getAccessToken();
  return $.get({
    url: "https://api.spotify.com/v1/" + endpoint,
    headers: { Authorization: "Bearer " + accessToken },
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
