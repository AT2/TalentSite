(function() {
  app.service("dictionaryService", [
    "$http", "$q", "API", "$timeout", function($http, $q, API, $timeout) {
      var queryArtistTypes, queryStates;
      queryArtistTypes = function() {
        var deferred;
        deferred = $q.defer();
        $http.get(API.address + "/artisttypes").success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
      queryStates = function() {
        var deferred;
        deferred = $q.defer();
        $http.get(API.address + "/states?CountryCode=AU").success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
      this.loadData = function() {
        var deferred;
        if (!sessionStorage.getItem("artistTypes")) {
          deferred = $q.defer();
          queryArtistTypes().then(function(data) {
            sessionStorage.setItem("artistTypes", JSON.stringify(data.Result));
            queryStates().then(function(data) {
              sessionStorage.setItem("states", JSON.stringify(data.Result));
              return deferred.resolve();
            });
          });
          return deferred.promise;
        } else {
          return $timeout(function() {
            var s;
            return s = 1;
          }, 1000);
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=dictionaryService.js.map
