app.service "dictionaryService",["$http","$q","API","$timeout"
  ($http, $q, API, $timeout)->
    queryArtistTypes = ()->
      deferred = $q.defer()
      $http
          .get API.address+"/artisttypes"
          .success(
            (data,status,headers,config)->
              deferred.resolve data
          )
          .error(
            (data,status,headers,config)->
              deferred.reject data
          )
      return deferred.promise
      
    queryStates = ()->
      deferred = $q.defer()
      $http
          .get API.address+"/states?CountryCode=AU"
          .success(
            (data,status,headers,config)->
              deferred.resolve data
          )
          .error(
            (data,status,headers,config)->
              deferred.reject data
          )
      return deferred.promise
    #load dictionary data
    this.loadData = 
        ()->
            if !sessionStorage.getItem("artistTypes")
                deferred = $q.defer()
                queryArtistTypes()
                    .then(
                        (data)->
                            sessionStorage.setItem("artistTypes", JSON.stringify(data.Result))
                            queryStates()
                                .then(
                                    (data)->
                                        sessionStorage.setItem("states", JSON.stringify(data.Result))
                                        deferred.resolve()
                                )
                            return
                    )
                return deferred.promise 
             else
                #return promised
                $timeout(
                    ()->
                        s=1
                    ,1000
                )
            
            
    return
]