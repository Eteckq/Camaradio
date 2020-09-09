function getMe() {
  return new Promise((resolve, reject) => {
    fetch("/api/spotify/me").then((data) => {
      console.log(data);
      resolve(data);
    });
  });
}

function fetch(endpoint) {
  return $.get(endpoint).catch((error) => {
    console.log(error);
  });
}
