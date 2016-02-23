(function () {
    window.app = angular.module("talent", ["chieffancypants.loadingBar", "ui.router", "ngDialog", "ngCookies", "ngMessages", "ngAnimate", "ngSanitize", "ngRoute", "afkl.lazyImage", "ui.select"]);

    app.constant("API", {
        address: "http://api.at2casting.com/api",
        key: "D4FEC1EAF0D2413DAD5067D9E2CAAC98",
        hideFilters: ["Available", "Region", "Department", "Type"],
        login: "NONE", //NONE: no need login; FIRST: login first; CLICK: login when click
    });
    //route
    app.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider) {
        //case insensitive
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise('/artists/standard');
        $stateProvider
            .state('standarad', {
                url: "/artists/standard{path:.*}",
                templateUrl: "/static/partial/_standard.html",
                controller: "artistListController",
            })
            .state('compact', {
                url: "/artists/compact{path:.*}",
                templateUrl: "/static/partial/_compact.html",
                controller: "artistListController",
            })
            .state('detail', {
                url: "/artist/:artistId",
                templateUrl: "/static/partial/_detail.html",
                controller: "artistDetailController",
            })
            .state('login', {
                url: "/login",
                templateUrl: "/static/partial/_login.html",
                controller: "accountController",
            })
            .state('register', {
                url: "/register",
                templateUrl: "/static/partial/_register.html",
                controller: "accountController",
            })
        ;
        $locationProvider.html5Mode(true);
    })
    //auth
    app.run(function ($rootScope, $location, $cookies, $http, API, ngDialog) {
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            if (restrictedPage && API.login === "FIRST" && !angular.isDefined($cookies.get('login'))) {
                ngDialog.open({
                    template: '/static/partial/_login.html',
                    controller: 'accountController',
                    showClose: false,
                    closeByEscape: false,
                    closeByDocument: false
                })
                return false;
            }
        });
    });

}).call(this);

//# sourceMappingURL=app.js.map
