app.controller "accountController",[ "$scope", "ngDialog", "$cookies","accountService","API", "$location", "$window",
    ($scope, ngDialog, $cookies, accountService, API, $location, $window)->
        $scope.client = {}
        $scope.login = {}
        $scope.invalidAccount = false
        
        $scope.onSubmit = 
            (isValid,isRedirect)->
                if isValid
                    accountService
                        .login $scope.login.userName, $scope.login.password
                        .then(
                            (data) ->
                                if data and data.Description is "success"
                                    $cookies.put("login", true)
                                    $cookies.put("memberId", data.Result.MemberId)
                                    $cookies.put("memberTypeCode", data.Result.MemberTypeCode)
                                    $scope.invalidAccount = false
                                    ngDialog.close() 
                                    $window.location.href = "http://app.at2casting.com/au/join/LoginRedirect.aspx?url="+$window.encodeURIComponent("/au/Member/ArtistHome.aspx")+"&memberid="+data.Result.MemberId if isRedirect and data.Result.MemberTypeCode is "ARTS" 
                                else 
                                    $scope.invalidAccount = true
                                return
                        )
                 return
        $scope.register = ()->
            ngDialog.close()
            ngDialog.open({
                template: '/static/partial/_register.html',
                controller: 'accountController',
                className: 'ngdialog-theme-default',
                showClose: API.login isnt "FIRST",
                closeByEscape: API.login isnt "FIRST",
                closeByDocument: API.login isnt "FIRST"
            })
            return
        $scope.loginRedirect = ()->
            ngDialog.open({
                template: '/static/partial/_login_redirect.html',
                controller: 'accountController',
                className: 'ngdialog-theme-default',
            })
            return
        return
       
]
