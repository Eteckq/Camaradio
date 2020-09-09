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
          <button type="button" class="btn btn-dark">Ajouter</button>
        </th>
        <td>${searchResult.name}</td>
        <td>${searchResult.artists[0].name}</td>
      </tr>`);
  });
}

function displayQueueTable() {
  $("#queueTable").empty();
}
