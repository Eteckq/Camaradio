function getMe() {
  console.log("Get infos..");
  fetch("/api/spotify/me").then((data) => {
    console.log(data);
  });
}

function fetch(endpoint) {
  return $.get(endpoint).catch((error) => {
    console.log(error);
  });
}
