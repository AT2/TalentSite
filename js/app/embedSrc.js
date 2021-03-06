﻿(function() {
  app.directive("embedSrc", function() {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var current;
        current = element;
        return scope.$watch((function() {
          return attrs.embedSrc;
        }, function() {
          var clone;
          clone = element.clone();
          clone.attr("src", attrs.embedSrc);
          current.replaceWith(clone);
          current = clone;
        }));
      }
    };
  });

}).call(this);

//# sourceMappingURL=embedSrc.js.map
