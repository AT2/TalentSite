window.app = angular.module "talent",["ngSanitize","ngRoute","afkl.lazyImage","ui.select"]
#config
app.constant("API", {
    address: "http://api.at2casting.com/api"
    key:"pmYULhEU6WpyaAO39Vtn6812uvW1olen20r7z0GzmCFmD0dI6Q"
  }
)
#route
app.config [
  "$routeProvider","$locationProvider",
  ($routeProvider, $locationProvider) ->
    $routeProvider.when(
      "/artists/standard",{
        controller: "artistListController"
        templateUrl: "/Views/Pages/standard.html"
      }
    )
    $locationProvider.html5Mode(true)
]
