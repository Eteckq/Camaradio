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

  bindMuteCurrentTrackButton(handler) {
    $("#muteCurrentTrack").click(function () {
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

  setTitleIfThereIsTrackInQueue(queueFilled) {
    if (queueFilled) {
      $("#trackIncoming").html("À venir...");
    } else {
      $("#trackIncoming").html("Aucune musique en attente");
    }
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

  clearQueueTable() {
    $("#tracksQueue").empty();
    this.setTitleIfThereIsTrackInQueue(false);
  }

  displayQueueTableFromTracks(queueItems) {
    this.clearQueueTable();
    this.setTitleIfThereIsTrackInQueue(true);
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

  displayHaterAnimation(track, user) {
    const hatedTrackElem = $(`#page1 div[track-id=${track.id}]`);
    const hatedTrackTop = hatedTrackElem.position().top;
    const windowWidth = window.innerWidth;

    $("#page1").append(`
    <div class="trackContainer" class="hatedAnimationBloc" id="before-anim-${track.id}" style="background: #1d1d1d">
    <i class="fas fa-angry trackQueueAngryIcon"></i>
    
    <p class="trackName">${track.name}</p>
    ·
    <p class="trackArtist">${track.artists[0].name}</p>
    <p class="trackAdder">par ${user.display_name}</p>
  </div>`);

    var beforeAnimElement = $(`#before-anim-${track.id}`);
    beforeAnimElement.css({
      position: "absolute",
      top: hatedTrackTop + 100,
      left: 0,
    });

    $("#page1").append(`
    <div id="anim-${track.id}"  class="hatedAnimationBloc">
    <i id="testAnim" class="fas fa-angry trackQueueAngryIcon"></i>
    <p style="margin: 40px">${user.display_name} hated this music</p>
    <i id="testAnim" class="fas fa-angry trackQueueAngryIcon"></i>
  </div>`);

    var animElement = $(`#anim-${track.id}`);
    animElement.css("left", windowWidth);
    animElement.css("top", hatedTrackTop + 100);

    $("#page1").append(`
      <div class="trackContainer" class="hatedAnimationBloc" id="after-anim-${track.id}" style="background: #1d1d1d">
      <i class="fas fa-angry trackQueueAngryIcon"></i>

      <p class="trackName">${track.name}</p>
      ·
      <p class="trackArtist">${track.artists[0].name}</p>
      <p class="trackAdder">par ${user.display_name}</p>
    </div>`);

    var afterAnimElement = $(`#after-anim-${track.id}`);

    afterAnimElement.css({
      position: "absolute",
      top: hatedTrackTop + 100,
      left: windowWidth * 2,
    });

    var pos = 0;

    var id = setInterval(frame, 5);

    function frame() {
      if (pos < -2 * windowWidth) {
        clearInterval(id);
        beforeAnimElement.remove();
        animElement.remove();
        afterAnimElement.remove();
      } else {
        pos -= 2.5;
        beforeAnimElement.css("left", pos + "px");
        animElement.css("left", pos + windowWidth + "px");
        afterAnimElement.css("left", pos + windowWidth * 2 + "px");
      }
    }
  }

  displayCurrentPlayedTrack(track, user) {
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
    ><i id="muteCurrentTrack" class="fas fa-volume-mute"></i></div>
    <div class="column" id="middleCol">
      <div id="currentTrackText">
        <div id="currentTrackName">${track.name}</div>
        ·
        <div id="currentTrackArtist">${track.artists[0].name}</div>
      </div>
      <div id="currentTrackAdder">par ${user.display_name}</div>
    </div>
    <div class="column" id="rigthCol">
      <i id="currenTrackAngryIcon" class="fas fa-angry icon"></i>
    </div>`);
  }

  displayCurrentUsersList(users) {
    $("#nbUsersText").empty();

    $("#nbUsersText").append(`    
      <span id="nbUsers"> ${users.length} </span>
    ${users.length == 1 ? "utilisateur connecté" : "utilisateurs connectés"}`);

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
