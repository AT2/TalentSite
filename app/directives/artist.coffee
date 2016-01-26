app.directive "artist",
  ->
    restrict: "E"
    scope:
      intro: "="
    templateUrl: "/static/partial/_artist.html"
    transclude: true
    replace: true
