app.directive "embedSrc",
  ->
    restrict: "A"
    link:
      (scope, element, attrs)->
        current = element
        scope.$watch (
          -> return attrs.embedSrc
          ->
            clone = element.clone()
            clone.attr "src",attrs.embedSrc
            current.replaceWith clone
            current = clone
            return
        )
