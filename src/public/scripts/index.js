$("#search").click(async function () {
  const searchValue = $("#searchInput").val();
  const result = await search(searchValue);
  displaySearchResult(result.tracks.items);
});

function displaySearchResult(searchResults) {
  $("#searchResultTable").empty();

  searchResults.forEach((searchResult) => {
    $("#searchResultTable").append(`
      <tr>
        <th scope='row'>
          <button type="button" class="btn btn-dark" onClick="addTrackToQueue('${searchResult.id}')">Ajouter</button>
        </th>
        <td>${searchResult.name}</td>
        <td>${searchResult.artists[0].name}</td>
      </tr>`);
  });
}

function displayQueueTableFromTracks(tracks) {
  $("#queueTable").empty();

  tracks.forEach((track) => {
    getTrackFromId(track.trackId).then((trackInfos) => {
      getUserFromId(track.userId).then((userInfo) => {
        $("#queueTable").append(`
          <tr>
            <td>${trackInfos.name}</td>
            <td>${trackInfos.artists[0].name}</td>
            <td>Added by ${userInfo.display_name}</td>
          </tr>`);
      });
    });
  });
}

function addTrackToQueue(trackId) {
  console.log("at click");
  socket.emit("addTrack", { trackId: trackId });
}
