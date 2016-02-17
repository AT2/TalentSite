app.controller "accountController",[ "$scope", "ngDialog", "$cookies","accountService",
    ($scope, ngDialog, $cookies, accountService)->
        $scope.client = {}
        $scope.login = {}
        $scope.invalidAccount = false
        
        $scope.onSubmit = 
            (isValid)->
                if isValid
                    accountService
                        .login $scope.login.userName, $scope.login.password
                        .then(
                            (data) ->
                                if data and data.Description is "success"
                                    debugger
                                    $cookies["login"] = true 
                                    $cookies["memberId"] = data.Result.MemberId 
                                    $cookies["memberTypeCode"] = data.Result.MemberTypeCode 
                                    $scope.invalidAccount = false
                                else 
                                    $scope.invalidAccount = true
                                return
                        )
        $scope.register = ()->
            ngDialog.close()
            ngDialog.open({
                template: '/static/partial/_register.html',
                controller: 'accountController',
                className: 'ngdialog-theme-default dialog-compcard-width',
                closePrevious: true
            })
            return
        return
       
]
