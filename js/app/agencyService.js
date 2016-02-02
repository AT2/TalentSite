(function() {
  app.service("agencyService", [
    "$http", "$q", "API", function($http, $q, API) {
      this.get = function() {
        var deferred;
        deferred = $q.defer();
        $http.get(API.address + "/agencies/" + API.agencyID + "?apikey=" + API.key).success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
      return "";
    }
  ]);

}).call(this);

//# sourceMappingURL=agencyService.js.map
