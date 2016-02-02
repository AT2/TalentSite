(function() {
  app.service("artistService", [
    "$http", "$q", "API", function($http, $q, API) {
      this.queryList = function(filters) {
        var deferred;
        deferred = $q.defer();
        $http.get(API.address + "/artists?pageNum=10000&apikey=" + API.key + "&" + filters).success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
      this.queryDetail = function(memberId) {
        var deferred;
        deferred = $q.defer();
        $http.get("/data/profile.json").success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=artistService.js.map
