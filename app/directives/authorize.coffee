app.directive "authorize",
  ->
    restrict: "A"
    scope:
    intro: "="
    templateUrl: "/static/partial/_artist.html"
    transclude: true
    replace: true