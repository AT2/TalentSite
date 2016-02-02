(function() {
  app.filter("take", function() {
    return function(items, count) {
      var filtered;
      if (items) {
        return filtered = items.slice(0, +(count - 1) + 1 || 9e9);
      }
    };
  });

}).call(this);

//# sourceMappingURL=take.js.map
