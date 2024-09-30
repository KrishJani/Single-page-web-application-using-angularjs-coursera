(function() {
    'use strict';

    angular.module('ShoppingListManager', [])
        .controller('ItemsToBuyController', ItemsToBuyController)
        .controller('BoughtItemsController', BoughtItemsController)
        .service('ShoppingService', ShoppingService);

    ItemsToBuyController.$inject = ['ShoppingService'];

    function ItemsToBuyController(ShoppingService) {
        var buyCtrl = this;

        buyCtrl.items = ShoppingService.getPendingItems();

        buyCtrl.purchaseItem = function(index) {
            ShoppingService.purchaseItem(index);
        };
    }

    BoughtItemsController.$inject = ['ShoppingService'];

    function BoughtItemsController(ShoppingService) {
        var boughtCtrl = this;

        boughtCtrl.items = ShoppingService.getPurchasedItems();
    }

    function ShoppingService() {
        var service = this;

        var itemsToPurchase = [
            { name: "cookies", quantity: 10 },
            { name: "cokes", quantity: 2 },
            { name: "beers", quantity: 6 },
            { name: "apples", quantity: 4 },
            { name: "bananas", quantity: 7 }
        ];

        var purchasedItems = [];

        service.purchaseItem = function(index) {
            var item = itemsToPurchase[index];
            purchasedItems.push(item);
            itemsToPurchase.splice(index, 1);
        };

        service.getPendingItems = function() {
            return itemsToPurchase;
        };

        service.getPurchasedItems = function() {
            return purchasedItems;
        };
    }
})();
