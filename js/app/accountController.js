(function() {
  app.controller("accountController", [
    "$scope", "ngDialog", "$cookies", "accountService", "API", "$location", "$window", function($scope, ngDialog, $cookies, accountService, API, $location, $window) {
      $scope.client = {};
      $scope.login = {};
      $scope.invalidAccount = false;
      $scope.onSubmit = function(isValid, isRedirect) {
        if (isValid) {
          accountService.login($scope.login.userName, $scope.login.password).then(function(data) {
            if (data && data.Description === "success") {
              $cookies.put("login", true);
              $cookies.put("memberId", data.Result.MemberId);
              $cookies.put("memberTypeCode", data.Result.MemberTypeCode);
              $scope.invalidAccount = false;
              ngDialog.close();
              if (isRedirect && data.Result.MemberTypeCode === "ARTS") {
                $window.location.href = "http://app.at2casting.com/au/join/LoginRedirect.aspx?url=" + $window.encodeURIComponent("/au/Member/ArtistHome.aspx") + "&memberid=" + data.Result.MemberId;
              }
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
          className: 'ngdialog-theme-default',
          showClose: API.login !== "FIRST",
          closeByEscape: API.login !== "FIRST",
          closeByDocument: API.login !== "FIRST"
        });
      };
      $scope.loginRedirect = function() {
        ngDialog.open({
          template: '/static/partial/_login_redirect.html',
          controller: 'accountController',
          className: 'ngdialog-theme-default'
        });
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=accountController.js.map
