function getMe() {
  return fetch("/api/spotify/me");
}

function fetch(endpoint) {
  return $.get(endpoint).catch((error) => {
    console.log(error);
  });
}
