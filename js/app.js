(function() {
  window.app = angular.module("talent", ["chieffancypants.loadingBar","ngDialog","ngCookies","ngMessages" ,"ngAnimate", "ngSanitize", "ngRoute", "afkl.lazyImage", "ui.select"]);

  app.constant("API", {
    address: "http://api.at2casting.com/api",
    key: "pmYULhEU6WpyaAO39Vtn6812uvW1olen20r7z0GzmCFmD0dI6Q",
    agencyID: 375
  });
  //route
  app.config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when("/register", {
            templateUrl: "/static/partial/_register.html",
            controller: "accountController"
        })
        .when("/login", {
            templateUrl: "/static/partial/_login.html",
            controller: "accountController"
        })
        .when("/artists/compact", {
            templateUrl: "/static/partial/_compact.html",
            controller: "artistListController",
            caseInsensitiveMatch: true
        })
        .when("/artists/standard", {
            templateUrl: "/static/partial/_standard.html",
            controller: "artistListController",
            caseInsensitiveMatch: true
        })
        .when("/artists/:artistId", {
            templateUrl: "/static/partial/_detail.html",
            controller: "artistDetailController",
            caseInsensitiveMatch: true
        })
      ;
      $locationProvider.html5Mode(true);
  })

}).call(this);

//# sourceMappingURL=app.js.map
