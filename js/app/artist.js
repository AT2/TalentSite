(function() {
  app.directive("artist", function() {
    return {
      restrict: "E",
      scope: {
        intro: "="
      },
      templateUrl: "/static/partial/_artist.html",
      transclude: true,
      replace: true
    };
  });

}).call(this);

//# sourceMappingURL=artist.js.map
