app.service "accountService",["$http","$q","API",
    ($http,$q, API)->
        this.login = 
            (username, password)->
                deferred = $q.defer()
                $http
                .post "/api/account/login",{"LoginName": username, "Password": password}
                .success(
                    (data,status,headers,config)->
                        deferred.resolve data
                )
                .error(
                    (data,status,headers,config)->
                        deferred.reject data
                )
                return deferred.promise
        this.register = 
            (client)->
                deferred = $q.defer()
                $http
                .post "/api/account/register", client
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