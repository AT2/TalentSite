app.service "agencyService",["$http","$q","API"
  ($http, $q , API)->
    this.get = 
        (agencyId)->
            deferred = $q.defer()
            $http
            .get API.address+"/agencies/"+agencyId+"?apikey="+API.key
            .success(
                (data,status,headers,config)->
                    deferred.resolve data
            )
            .error(
                (data,status,headers,config)->
                    deferred.reject data
            )
            return deferred.promise
    return ""
]