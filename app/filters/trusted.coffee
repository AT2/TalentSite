app.filter "trusted", [
  "$sce",
  ($sce) ->
    (url) ->
      return $sce.trustAsResourceUrl(url)
]