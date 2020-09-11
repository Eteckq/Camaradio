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

  bindHateTrackButton(handler) {
    $(".trackQueueAngryIcon").click(function () {
      handler($(this).parent().attr("track-id"));
    });
  }

  bindHateCurrentTrackButton(handler) {
    $("#currenTrackAngryIcon").click(function () {
      handler();
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
    $("#tracksQueue").empty();

    queueItems.forEach((queueItem) => {
      let haters = "";

      if (queueItem.haters.length > 0) {
        haters = `<span class="hatersCount">${queueItem.haters.length}</span>`;
      }
      $("#tracksQueue").append(`

      <div class="trackContainer" track-id="${queueItem.track.id}">
      <i class="fas fa-angry trackQueueAngryIcon">${haters}</i>
      
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

  displayCurrentUsersList(users) {
    $("#userList").empty();
    users.forEach((user) => {
      $("#userList").append(
        `<div class="userName"> ${user.display_name}</div>`
      );
    });
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
