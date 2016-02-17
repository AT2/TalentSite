app.controller "artistListController",["$scope", "ngDialog" ,"artistService","filterService"
  ($scope, ngDialog , artistService, filterService)->
    $scope.showFilter = true
    $scope.artists = []
    $scope.filters = []
    $scope.selectedFilters = {}
    $scope.ageRangeFilter = {}
    $scope.queryString = "1=1";
    $scope.filterSelected = 
        (value, index, array) -> 
            value.selectedItem and value.selectedItem.Value.length > 0
    #init
    $scope.init = (mode)->
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
          filter.Value.unshift({ "Key": filter.Key, "Value":"" }) for filter in $scope.filters if mode is "Standard"
          filter.Value.unshift({ "Key": "All", "Value":"" }) for filter in $scope.filters if mode is "Compact"
          return
      )
      return
    #filter artists
    $scope.search = ()->
        queryString = "1=1"
        for filter in $scope.filters
            do (filter) ->
                $scope.selectedFilters["GenderCode"] = filter.selectedItem.Value if filter.Key is "Gender" and filter.selectedItem
                $scope.selectedFilters["HaveVideo"] = filter.selectedItem.Value if filter.Key is "Video" and filter.selectedItem
                $scope.selectedFilters["HaveAudio"] = filter.selectedItem.Value if filter.Key is "Audio" and filter.selectedItem
                $scope.selectedFilters["IsAvailable"] = filter.selectedItem.Value if filter.Key is "Available" and filter.selectedItem
                $scope.selectedFilters["StateID"] = filter.selectedItem.Value if filter.Key is "Region" and filter.selectedItem
                $scope.selectedFilters["ArtistTypeCodes"] = filter.selectedItem.Value if filter.Key is "Type" and filter.selectedItem
                $scope.ageRangeFilter= ((value, index, array) -> value.Age >= filter.selectedItem.Value.split("-")[0] and value.Age <= filter.selectedItem.Value.split("-")[1])  if filter.Key is "Age" and filter.selectedItem
                queryString+="&Height="+ filter.selectedItem.Value.replace("-",":") if filter.Key is "Height" and filter.selectedItem
                queryString+="&HairColour="+ filter.selectedItem.Value if filter.Key is "Hair" and filter.selectedItem
                queryString+="&Ethnicity="+ filter.selectedItem.Value if filter.Key is "Ethnicity" and filter.selectedItem
                queryString+="&EyeColour="+ filter.selectedItem.Value if filter.Key is "Eye" and filter.selectedItem
                return
        if queryString.length > 3 and queryString isnt $scope.queryString
            $scope.queryString = queryString
            artistService.queryList($scope.queryString).then(
                (data)->
                    $scope.artists = data.Result.ArtistList
                    return
            )
        return
    #change select condition 
    $scope.onSelectFilter = (filter, item)->
        filter.selectedItem = item 
        $scope.search() 
        return
    return
]