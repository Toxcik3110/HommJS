app.controller('CityViewCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.armyCastle = [];
    $scope.firstPos = 0;
    $scope.armyHero = [];
    $scope.stockArmy = [];
    $scope.cities = [];
    for(let i = 0; i < 8; i++) {
        $scope.armyCastle.push({id:i});
        $scope.armyHero.push({id:i});
        $scope.stockArmy.push({id:i});
        $scope.cities.push({id:i,color:"rgb(0,0," + i*25 +")"});
    }
    console.log(12);

    $scope.cityDown = function() {
        if($scope.firstPos<$scope.cities.length-3)
        $scope.firstPos++;
    }

    $scope.cityUp = function() {
        if($scope.firstPos > 0) {
            $scope.firstPos--;
        }
    }

}])

app.filter('onlyThreeCities', function() {
    return function(input, a) {
        let s = input.map((x) => x);
        return s.splice(a,3);
    }
});
