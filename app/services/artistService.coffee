app.service "artistService",["$http","$q",
  ($http,$q)->
    this.queryList = (filters)->
      deferred = $q.defer()
      $http
        .get "../../data.json"
        .success(
          (data,status,headers,config)->
            deferred.resolve data
        )
        .error(
          (data,status,headers,config)->
            deferred.reject data
        )
      return deferred.promise

    this.queryDetail = (memberId) ->
      deferred = $q.defer()
      $http
      .get "../../artist.json"
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