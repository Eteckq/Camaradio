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
      $("#searchResultTable")
        .append(`<div class="trackResult" onClick="app.addTrackToQueue('${searchResult.id}')">
        <div
        class="trackCover"
        style="background-image: url('${searchResult.album.images[1].url}');"
        ></div>
       <div class="trackInfos">
        <div class="trackName">
        ${searchResult.name}
        </div>
        <div class="trackAuthor">${searchResult.artists[0].name}</div>
       </div>
      </div>
      <hr style="border: 1px solid #545454;" />`);
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

  setTimelinePercentage(percent) {
    $("#timeLine").css("width", percent + "%");
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
