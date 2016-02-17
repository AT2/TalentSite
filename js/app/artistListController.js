(function() {
  app.controller("artistListController", [
    "$scope", "ngDialog", "artistService", "filterService", function($scope, ngDialog, artistService, filterService) {
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
        artistService.queryList().then(function(data) {
          $scope.artists = data.Result.ArtistList;
        });
        filterService.queryFilters().then(function(data) {
          var filter, i, j, len, len1, ref, ref1;
          $scope.filters = data.Result;
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
    }
  ]);

}).call(this);

//# sourceMappingURL=artistListController.js.map
