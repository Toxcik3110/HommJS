app.controller('CityViewCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.armyCastle = [];
    $scope.armyHero = [];
    for(let i = 0; i < 8; i++) {
        $scope.armyCastle.push({id:i});
        $scope.armyHero.push({id:i});
    }
    console.log(12);

}]);
