app.controller('CityViewCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.armyCastle = [];
    $scope.firstPos = 0;
    $scope.armyHero = [];
    $scope.stockArmy = [];
    $scope.cities = [];
    $scope.owner = 'red';
    $scope.castleType = 'castle';
    $scope.resources = {
        wood: 15,
        stone: 20,
        gold:2500
    }
    $scope.hireUnits = [];
    $scope.building = {
        main: {level:1, maxLevel:3},
        fort: {level:0, maxLevel:1}
    };
    $scope.availableBuild = true;
    for(let i = 0; i < 8; i++) {
        $scope.armyCastle.push({id:i});
        $scope.armyHero.push({id:i});


        $scope.cities.push({id:i,color:"rgb(0,0," + i*25 +")"});
    }
    for (let i = 0; i < 7; i++) {
        $scope.hireUnits.push({id:i});
        $scope.stockArmy.push({id:i});
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

    $scope.showBuild = function(bool) {
        $scope.build = bool;
    }

    $scope.showHire = function(bool) {
        $scope.hire = bool;
    }

    $scope.upgrade = function(building) {
        console.log(building);
        if($scope.availableBuild) {
            if(building.level != building.maxLevel) {
                building.level++;
                $scope.availableBuild = false;
            }
            $scope.showBuild(false);
        }
    }

}])
app.filter('ownerColor', function() {
    return function(input) {
        switch (input) {
            case 'red':
                return '#C50C0C';
                break;
            case 'blue':
                return '#0C0CB5';
                break;
            case 'green':
                return '#0C850C';
                break;
            default:
            return '#850C0C';
        }
    }
})
app.filter('onlyThreeCities', function() {
    return function(input, a) {
        let s = input.map((x) => x);
        return s.splice(a,3);
    }
});
