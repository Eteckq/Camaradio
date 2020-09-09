class View {
  constructor() {}

  bindSearchButton(handler) {
    $("#search").click(() => {
      handler($("#searchInput").val());
    });
  }

  displaySearchResult(searchResults) {
    $("#searchResultTable").empty();

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

  displayQueueTableFromTracks(tracks) {
    $("#queueTable").empty();

    tracks.forEach((track) => {
      // getTrackFromId(track.trackId).then((trackInfos) => {
      //   getUserFromId(track.userId).then((userInfo) => {
      $("#queueTable").append(`
            <tr>
              <td>${track.userId}</td>
            </tr>`);
      //   });
      // });
    });
  }
  /*
              <td>${trackInfos.artists[0].name}</td>
              <td>Added by ${userInfo.display_name}</td>
              */
}
