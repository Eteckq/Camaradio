function play() {
  console.log("play");

  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/me/player/play",
    headers: { Authorization: "Bearer " + accessToken },
  }).catch((error) => {
    console.log(error);
  });
}

async function pause() {
  console.log("pause");

  const response = await getCurrentDevice();
  console.log(response);

  let accessToken = getCookie("access_token");
  const result = await $.get({
    url: "https://api.spotify.com/v1/me/player/pause",
    headers: { Authorization: "Bearer " + accessToken },
    data: {
      device_id: response.devices[0].id,
    },
  }).catch((error) => {
    console.log(error);
  });

  console.log(result);
}

function nextTrack() {
  console.log("next track");

  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/me/player/play",
    headers: { Authorization: "Bearer " + accessToken },
  }).catch((error) => {
    console.log(error);
  });
}

function getCurrentTrack() {
  console.log("getcurrentrack");
  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: { Authorization: "Bearer " + accessToken },
  }).catch((error) => {
    console.log(error);
  });
}

function getCurrentDevice() {
  console.log("getCurrentDevice");
  let accessToken = getCookie("access_token");
  return $.get({
    url: "https://api.spotify.com/v1/me/player/devices",
    headers: { Authorization: "Bearer " + accessToken },
  }).catch((error) => {
    console.log(error);
  });
}
