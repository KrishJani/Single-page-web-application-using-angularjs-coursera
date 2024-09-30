(function() {
    'use strict';

    angular.module('LunchChecker', [])
        .controller('LunchCheckerController', LunchCheckerController);

    LunchCheckerController.$inject = ['$scope'];

    function LunchCheckerController($scope) {
        $scope.foodItems = '';
        $scope.responseMessage = '';
        $scope.hasChecked = false;

        $scope.evaluateLunch = function() {
            if (!$scope.foodItems.trim()) {
                $scope.isEmpty = true;
            } else {
                $scope.hasChecked = true;
                $scope.isEmpty = false;

                var foodArray = $scope.foodItems.split(',').filter(function(item) {
                    return item.trim() !== '';
                });

                $scope.responseMessage = foodArray.length <= 3 ? 'Enjoy!' : 'Too much!';
            }
        };
    }
})();
