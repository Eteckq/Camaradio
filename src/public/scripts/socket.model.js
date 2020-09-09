$(function () {
  socket = io();

  socket.on("connect", () => {
    getMe().then((data) => {
      socket.emit("hello", {
        id: data.id,
        name: data.display_name,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("updateTrackList", (tracks) => {
    console.log("updateTrackList", tracks);
    if (tracks.length === 0) {
      return;
    }

    displayQueueTableFromTracks(tracks);
  });
});
