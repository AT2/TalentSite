// Generated by CoffeeScript 1.10.0
(function() {
  app.controller("artistListController", [
    "$scope", "artistService", "filterService", function($scope, artistService, filterService) {
      $scope.showFilter = true;
      $scope.artists = [];
      $scope.filters = [];
      return $scope.init = function() {
        artistService.queryList("153208").then(function(data) {
          $scope.artists = data.Result.ArtistList;
        });
        filterService.queryFilters().then(function(data) {
          $scope.filters = data.Result;
        });
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=artistListController.js.map
