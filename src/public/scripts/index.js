$("#search").click(function () {
  const searchValue = $("#searchInput").val();
  console.log(searchValue);
  const result = search(searchValue);
  console.log(result);
});
