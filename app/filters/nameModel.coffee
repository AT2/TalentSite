app.filter "nameModel", [
  ->
    return (name, model) ->
      if model is "INIT"
        return name.substr(0,1)
      return name
]