app.controller('SpellBookCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.grid = [];
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 15; j++) {
            $scope.grid.push({y:i, x:j});
        }
    }

}]);
