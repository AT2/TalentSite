﻿(function() {
  app.service("filterService", [
    "$http", "$q", "API", function($http, $q, API) {
      this.queryFilters = function() {
        var deferred;
        deferred = $q.defer();
        $http.get("/api/filters").success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=filterService.js.map
