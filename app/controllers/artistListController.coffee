app.controller "artistListController",["$scope", "$stateParams", "ngDialog" ,"artistService","filterService", "dictionaryService", "API"
  ($scope, $stateParams, ngDialog , artistService, filterService, dictionaryService, API)->
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
     #query filters
        filterService.queryFilters()
            .then(
                (data)->
                    $scope.filters = _.reject(data.Result, 
                        (filter)->
                            _.indexOf(API.hideFilters, filter.Key) != -1
                    )
                    filter.Value.unshift({ "Key": filter.Key, "Value":"" }) for filter in $scope.filters if mode is "Standard"
                    filter.Value.unshift({ "Key": "All", "Value":"" }) for filter in $scope.filters if mode is "Compact"
                    return
            )
        #extract filters from url
        if $stateParams.path
            dictionaryService
                .loadData()
                .then(
                    ()->
                        filters = extractFilters($stateParams.path)
                        artistService
                            .queryList(filters)
                            .then(
                                (data)->
                                    $scope.artists = data.Result.ArtistList
                                    return
                            )
                        return
                )
        else
            #query artists 
            artistService
                .queryList()
                .then(
                    (data)->
                        $scope.artists = data.Result.ArtistList
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
    extractFilters = (url)->
        params = url.split("/")
        filters = "1=1"
        #artist type
        artistTypeFilterString = _.find(params, (filter)->s(filter).toUpperCase().include("ARTISTTYPE"))
        if artistTypeFilterString
            artistTypeName = artistTypeFilterString.replace(/artisttype_/i,"").replace(/_/g," ")
            artistType = _.findWhere(JSON.parse(sessionStorage.getItem("artistTypes")),{"Name": artistTypeName})
            filters += "&"+"ArtistType="+ artistType.Code if artistType
        #state
        states = JSON.parse(sessionStorage.getItem("states"))
        state = _.find(states, 
            (s)->
                _.find(params,
                    (p)->
                        s.Code.toUpperCase() == p.toUpperCase()
                )
        )
        filters += "&"+"State="+ state.ID if state
        #age range
        ageFilterString = _.find(params, (filter)->s(filter).toUpperCase().include("AGE"))
        if ageFilterString
            ageValue = ageFilterString.replace(/age/i,"").replace("-",":")
            filters += "&"+"Age="+ ageValue if ageValue
        return filters
    return
]