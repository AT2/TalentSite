app.service "artistService",["$http","$q","API"
  ($http,$q, API)->
    this.queryList = (filters)->
      deferred = $q.defer()
      $http
        .get API.address+"/artists?apikey="+API.key
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
      .get "../../data/artist.json"
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