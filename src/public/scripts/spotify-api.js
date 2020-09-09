function getMe() {
  return fetch("/api/spotify/me");
}

function fetch(endpoint) {
  // let user = cookie.get("user")
  console.log(document.cookie);
  return $.get(endpoint).catch((error) => {
    console.log(error);
  });
}
