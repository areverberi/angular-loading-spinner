var angularSpinner = require('angular-spinner');
(function(){
    angular.module('ngLoadingSpinner', [angularSpinner.name])
    .directive('usSpinner',   ['$http','$rootScope','$window',function ($http,$rootScope,$window){
        return {
            link: function (scope, elm, attrs)
            {
                if(attrs.$attr.usSpinnerStandalone) return;
                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading)
                {
                    $rootScope.spinnerActive = loading;
                    if(loading){
                        elm.removeClass('ng-hide');
                    }else{
						            if(angular.isDefined($window.parent.iframeFogliLoaded)){
                          $window.parent.iframeFogliLoaded();
                        }
                        if(angular.isDefined($window.parent.unBlockDOUI)){
                          $window.parent.unBlockDOUI();
                        }
                        elm.addClass('ng-hide');
                    }
                });
            }
        };

    }]);
}).call(this);

module.exports='ngLoadingSpinner';
