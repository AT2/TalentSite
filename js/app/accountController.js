(function() {
  app.controller("accountController", [
    "$scope", "ngDialog", "$cookies", "accountService", function($scope, ngDialog, $cookies, accountService) {
      $scope.client = {};
      $scope.login = {};
      $scope.invalidAccount = false;
      $scope.onSubmit = function(isValid) {
        if (isValid) {
          return accountService.login($scope.login.userName, $scope.login.password).then(function(data) {
            if (data && data.Description === "success") {
              debugger;
              $cookies["login"] = true;
              $cookies["memberId"] = data.Result.MemberId;
              $cookies["memberTypeCode"] = data.Result.MemberTypeCode;
              $scope.invalidAccount = false;
            } else {
              $scope.invalidAccount = true;
            }
          });
        }
      };
      $scope.register = function() {
        ngDialog.close();
        ngDialog.open({
          template: '/static/partial/_register.html',
          controller: 'accountController',
          className: 'ngdialog-theme-default dialog-compcard-width',
          closePrevious: true
        });
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=accountController.js.map
