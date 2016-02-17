(function() {
  app.service("accountService", [
    "$http", "$q", "API", function($http, $q, API) {
      this.login = function(username, password) {
        var deferred;
        deferred = $q.defer();
        $http.post("/api/account/login", {
          "LoginName": username,
          "Password": password
        }).success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          return deferred.reject(data);
        });
        return deferred.promise;
      };
      this.register = function(client) {
        var deferred;
        deferred = $q.defer();
        $http.post("/api/account/register", client).success(function(data, status, headers, config) {
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

//# sourceMappingURL=accountService.js.map
