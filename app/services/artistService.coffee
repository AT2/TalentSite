app.service "artistService",["$http","$q","API"
  ($http,$q, API)->
    this.queryList = (filters)->
      deferred = $q.defer()
      $http
        .get API.address+"/artists?pageNum=10000&HasPhoto=true&apikey="+API.key+"&"+filters
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
      .get API.address+"/artists/"+memberId+"?apikey="+API.key
      #.get "/data/profile.json"
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