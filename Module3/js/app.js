(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onEmpty: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.shortName = '';

        menu.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function(items) {
                if (items && items.length > 0) {
                    menu.message = '';
                    menu.found = items;
                } else {
                    menu.message = 'Nothing found!';
                    menu.found = [];
                }
            });
        };

        menu.removeMenuItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response) {
        if (!response || !response.data) {
            throw new Error('Invalid API response');
        }
        var foundItems = [];
        
        // Iterate through each category (A, B, C, etc.)
        angular.forEach(response.data, function(category) {
        if (category.menu_items) {
            // Iterate through the menu_items in each category
            angular.forEach(category.menu_items, function(item) {
                // Check if searchTerm matches the item description
                if (searchTerm.length > 0 && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                    foundItems.push(item);
                }
            });
          }
        });

        return foundItems;
    })
    .catch(function(error) {
        console.error("Error occurred: ", error);
        return [];
    });
};
}
})();
