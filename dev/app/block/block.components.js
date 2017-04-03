'use strict';

;(function () {

    angular
        .module('block')
        .component('block', {
            templateUrl: 'app/block/block.template.html',
            controller: BlockCtrl
        });

    BlockCtrl.$inject = ['$scope', '$rootScope'];

    function BlockCtrl($scope, $rootScope) {
        this.name = ' componenta';
    };

})();