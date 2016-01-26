(function() {
  app.filter("trusted", [
    "$sce", function($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=trusted.js.map
