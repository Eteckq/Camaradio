class View {
  constructor() {}

  bindSearchButton(handler) {
    $("#searchIcon").click(() => {
      handler();
    });
  }

  bindSearchBar(handler) {
    $("#searchBar").keypress((test) => {
      let val = $("#searchBar").val();
      if (val != "") handler($("#searchBar").val());
    });
  }

  bindMenuButton(handler) {
    $("#menuIcon").click(() => {
      handler();
    });
  }

  bindBackToHomeButton(handler) {
    $(".backToHome").click(() => {
      handler();
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
    $("#tracksQueue").empty();

    queueItems.forEach((queueItem) => {
      $("#tracksQueue").append(`

      <div class="trackContainer">
      <i class="fas fa-angry trackQueueAngryIcon"></i>
      <p class="trackName">${queueItem.track.name}</p>
      ·
      <p class="trackArtist">${queueItem.track.artists[0].name}</p>
      <p class="trackAdder">par ${queueItem.user.display_name}</p>
    </div>`);
    });
  }

  displayCurrentPlayedTrack(track) {
    $("#currentTrack").empty();

    $("#currentTrack").append(`

    <div
      id="leftCol"
      class="column"
      style="
        background-image: url('${track.album.images[1].url}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      "
    ></div>
    <div class="column" id="middleCol">
      <div id="currentTrackText">
        <div id="currentTrackName">${track.name}</div>
        ·
        <div id="currentTrackArtist">${track.artists[0].name}</div>
      </div>
      <div id="currentTrackAdder">par tom</div>
    </div>
    <div class="column" id="rigthCol">
      <i id="currenTrackAngryIcon" class="fas fa-angry icon"></i>
    </div>`);
  }

  displayHomePage() {
    $("#page1").show();
    $("#page2").hide();
    $("#page3").hide();
  }

  displaySearchPage() {
    $("#page1").hide();
    $("#page2").show();
    $("#page3").hide();
  }

  displayMenuPage() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").show();
  }
}
