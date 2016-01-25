app.directive "artist",
  ->
    restrict: "E"
    scope:
      intro: "="
    templateUrl: "../../Views/partial/_artist.html"
    transclude: true
    replace: true
