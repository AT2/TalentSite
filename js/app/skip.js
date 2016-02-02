(function() {
  app.filter("skip", function() {
    return function(items, count) {
      var filtered;
      if (items) {
        return filtered = items.slice(count);
      }
    };
  });

}).call(this);

//# sourceMappingURL=skip.js.map
