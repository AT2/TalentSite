app.controller "artistListController",["$scope","artistService","filterService"
  ($scope, artistService, filterService)->
    $scope.showFilter = true
    $scope.artists = []
    $scope.filters = []

    $scope.init = ->
      artistService
      .queryList()
      .then(
        (data)->
          $scope.artists = data.Result.ArtistList
          return
      )
      filterService.queryFilters()
      .then(
        (data)->
          $scope.filters = data.Result
          #filter.selectedItem = {} for filter in $scope.filters
          return
      )
      return
]