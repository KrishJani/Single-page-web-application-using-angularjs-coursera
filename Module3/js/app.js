(function() {
    'use strict';

    angular.module('MenuSearchApp', [])
        .controller('MenuSearchController', MenuSearchController)
        .service('SearchService', SearchService)
        .constant('ApiBaseUrl', "https://davids-restaurant.herokuapp.com")
        .directive('menuItems', MenuItemsDirective);

    function MenuItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'menuItems.html',
            scope: {
                items: '<',
                emptyMessage: '<',
                onRemove: '&'
            },
            controller: MenuSearchController,
            controllerAs: 'ctrl',
            bindToController: true
        };
    }

    MenuSearchController.$inject = ['SearchService'];

    function MenuSearchController(SearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';

        ctrl.searchMenuItems = function(term) {
            SearchService.findMenuItems(term).then(function(result) {
                if (result && result.length > 0) {
                    ctrl.errorMessage = '';
                    ctrl.itemsFound = result;
                } else {
                    ctrl.errorMessage = 'No items match your search!';
                    ctrl.itemsFound = [];
                }
            });
        };

        ctrl.removeItem = function(index) {
            ctrl.itemsFound.splice(index, 1);
        };
    }

    SearchService.$inject = ['$http', 'ApiBaseUrl'];

    function SearchService($http, ApiBaseUrl) {
        var service = this;

        service.findMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBaseUrl + "/menu_items.json")
            }).then(function(response) {
                var matchingItems = [];

                response.data['menu_items'].forEach(function(item) {
                    if (searchTerm && item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchingItems.push(item);
                    }
                });

                return matchingItems;
            });
        };
    }
})();
