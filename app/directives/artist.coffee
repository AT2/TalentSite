app.directive "artist",
  ->
    restrict: "E"
    scope:
      intro: "="
    templateUrl: "../../View/partial/_artist.html"
    transclude: true
    replace: true
