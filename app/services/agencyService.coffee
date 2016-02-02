app.service "agencyService",["$http","$q","API"
  ($http,$q, API)->
    this.get = 
        ()->
            deferred = $q.defer()
            $http
            .get API.address+"/agencies/"+API.agencyID+"?apikey="+API.key
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