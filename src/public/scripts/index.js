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

function displayQueueTable(tracks) {
  $("#queueTable").empty();

  tracks.forEach((track) => {
    $("#queueTable").append(`
      <tr>
        <td>${track.name}</td>
        <td>${track.artists[0].name}</td>
      </tr>`);
  });
}

function addTrackToQueue(trackId) {
  console.log("at click");
  socket.emit("addTrack", { trackId: trackId });
}
