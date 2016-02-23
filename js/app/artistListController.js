(function() {
  app.controller("artistListController", [
    "$scope", "$stateParams", "ngDialog", "artistService", "filterService", "dictionaryService", "API", function($scope, $stateParams, ngDialog, artistService, filterService, dictionaryService, API) {
      var extractFilters;
      $scope.showFilter = true;
      $scope.artists = [];
      $scope.filters = [];
      $scope.selectedFilters = {};
      $scope.ageRangeFilter = {};
      $scope.queryString = "1=1";
      $scope.filterSelected = function(value, index, array) {
        return value.selectedItem && value.selectedItem.Value.length > 0;
      };
      $scope.init = function(mode) {
        filterService.queryFilters().then(function(data) {
          var filter, i, j, len, len1, ref, ref1;
          $scope.filters = _.reject(data.Result, function(filter) {
            return _.indexOf(API.hideFilters, filter.Key) !== -1;
          });
          if (mode === "Standard") {
            ref = $scope.filters;
            for (i = 0, len = ref.length; i < len; i++) {
              filter = ref[i];
              filter.Value.unshift({
                "Key": filter.Key,
                "Value": ""
              });
            }
          }
          if (mode === "Compact") {
            ref1 = $scope.filters;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              filter = ref1[j];
              filter.Value.unshift({
                "Key": "All",
                "Value": ""
              });
            }
          }
        });
        if ($stateParams.path) {
          dictionaryService.loadData().then(function() {
            var filters;
            filters = extractFilters($stateParams.path);
            artistService.queryList(filters).then(function(data) {
              $scope.artists = data.Result.ArtistList;
            });
          });
        } else {
          artistService.queryList().then(function(data) {
            $scope.artists = data.Result.ArtistList;
          });
        }
      };
      $scope.search = function() {
        var filter, fn, i, len, queryString, ref;
        queryString = "1=1";
        ref = $scope.filters;
        fn = function(filter) {
          if (filter.Key === "Gender" && filter.selectedItem) {
            $scope.selectedFilters["GenderCode"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Video" && filter.selectedItem) {
            $scope.selectedFilters["HaveVideo"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Audio" && filter.selectedItem) {
            $scope.selectedFilters["HaveAudio"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Available" && filter.selectedItem) {
            $scope.selectedFilters["IsAvailable"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Region" && filter.selectedItem) {
            $scope.selectedFilters["StateID"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Type" && filter.selectedItem) {
            $scope.selectedFilters["ArtistTypeCodes"] = filter.selectedItem.Value;
          }
          if (filter.Key === "Age" && filter.selectedItem) {
            $scope.ageRangeFilter = (function(value, index, array) {
              return value.Age >= filter.selectedItem.Value.split("-")[0] && value.Age <= filter.selectedItem.Value.split("-")[1];
            });
          }
          if (filter.Key === "Height" && filter.selectedItem) {
            queryString += "&Height=" + filter.selectedItem.Value.replace("-", ":");
          }
          if (filter.Key === "Hair" && filter.selectedItem) {
            queryString += "&HairColour=" + filter.selectedItem.Value;
          }
          if (filter.Key === "Ethnicity" && filter.selectedItem) {
            queryString += "&Ethnicity=" + filter.selectedItem.Value;
          }
          if (filter.Key === "Eye" && filter.selectedItem) {
            queryString += "&EyeColour=" + filter.selectedItem.Value;
          }
        };
        for (i = 0, len = ref.length; i < len; i++) {
          filter = ref[i];
          fn(filter);
        }
        if (queryString.length > 3 && queryString !== $scope.queryString) {
          $scope.queryString = queryString;
          artistService.queryList($scope.queryString).then(function(data) {
            $scope.artists = data.Result.ArtistList;
          });
        }
      };
      $scope.onSelectFilter = function(filter, item) {
        filter.selectedItem = item;
        $scope.search();
      };
      extractFilters = function(url) {
        var ageFilterString, ageValue, artistType, artistTypeFilterString, artistTypeName, filters, params, state, states;
        params = url.split("/");
        filters = "1=1";
        artistTypeFilterString = _.find(params, function(filter) {
          return s(filter).toUpperCase().include("ARTISTTYPE");
        });
        if (artistTypeFilterString) {
          artistTypeName = artistTypeFilterString.replace(/artisttype_/i, "").replace(/_/g, " ");
          artistType = _.findWhere(JSON.parse(sessionStorage.getItem("artistTypes")), {
            "Name": artistTypeName
          });
          if (artistType) {
            filters += "&" + "ArtistType=" + artistType.Code;
          }
        }
        states = JSON.parse(sessionStorage.getItem("states"));
        state = _.find(states, function(s) {
          return _.find(params, function(p) {
            return s.Code.toUpperCase() === p.toUpperCase();
          });
        });
        if (state) {
          filters += "&" + "State=" + state.ID;
        }
        ageFilterString = _.find(params, function(filter) {
          return s(filter).toUpperCase().include("AGE");
        });
        if (ageFilterString) {
          ageValue = ageFilterString.replace(/age/i, "").replace("-", ":");
          if (ageValue) {
            filters += "&" + "Age=" + ageValue;
          }
        }
        return filters;
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=artistListController.js.map
