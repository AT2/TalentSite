app.service "filterService",["$http","$q","API",
  ($http,$q, API)->
    this.queryFilters = ()->
      deferred = $q.defer()
      $http
      .get "/api/filters"
      .success(
        (data,status,headers,config)->
          deferred.resolve data
      )
      .error(
        (data,status,headers,config)->
          deferred.reject data
      )
      return deferred.promise
    return
]