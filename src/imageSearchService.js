export default class ImageSearchService{
  contructor($http){
    this.$inject = ["$http"];
  }
  search(query){
    return $http.get("https://api.cognitive.microsoft.com/bing/v5.0/images/search",
      {
        params: {q: query, count: 9,  offcet: 0, safeSearch: "Moderate"},
        headers: {"Ocp-Apim-Subscription-Key": "9482b6c8029f42c2a9e559772fe5da24"}
      })
      .then(response => {
          return response.data.value.map(item => {
            return {
              imageUrl: item.contentUrl,
              width: item.width,
              height: item.height,
              thumbnailUrl: item.thumbnailUrl
            }
          });
    });
  }
}
