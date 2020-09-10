class View {
  constructor() {}

  bindSearchButton(handler) {
    $("#search").click(() => {
      handler($("#searchInput").val());
    });
  }

  displaySearchResult(searchResults) {
    $("#searchResultTable").empty();
    // TODO Put 'id' in parent, and handle click event to get id (we shouldn't call 'app' on click)
    searchResults.forEach((searchResult) => {
      $("#searchResultTable").append(`
        <tr>
          <th scope='row'>
            <button type="button" class="btn btn-dark" onClick="app.addTrackToQueue('${searchResult.id}')">Ajouter</button>
          </th>
          <td>${searchResult.name}</td>
          <td>${searchResult.artists[0].name}</td>
        </tr>`);
    });
  }

  displayQueueTableFromTracks(queueItems) {
    $("#queueTable").empty();

    queueItems.forEach((queueItem) => {
      $("#queueTable").append(`
            <tr>
            <td>${queueItem.track.name}</td>
            <td>${queueItem.track.artists[0].name}</td>
            <td>Ajouté par ${queueItem.user.display_name}</td>
            </tr>`);
    });
  }

  displayCurrentPlayedTrack(track) {
    console.log("displayCurrentPlayedTrack");
    $("#currentTrack").empty();

    $("#currentTrack").append(`
            <tr>
            <td>${track.name}</td>
            <td>${track.artists[0].name}</td>
            </tr>`);
  }

  // PLAYER

  bindPlayBtn(handler) {
    $("#playBtn").click(() => {
      handler();
    });
  }

  bindPauseBtn(handler) {
    $("#pauseBtn").click(() => {
      handler();
    });
  }
}
