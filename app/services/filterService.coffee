app.service "filterService",["$http","$q",
  ($http,$q)->
    this.queryFilters = ()->
      deferred = $q.defer()
      $http
      .get "../../filters.json"
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