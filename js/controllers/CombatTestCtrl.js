app.controller('CombatTestCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.grid = [];
    $scope.offsetBattleX = window.innerWidth / 6;
    $scope.offsetBattleY = window.innerHeight / 8;
    console.log($scope.offsetBattleX/10);
    for (let i = 0; i < 11; i++) {
        let b = [];
        for (let j = 0; j < 15; j++) {
            b.push({y:i, x:j, connected:[], value:0});
        }
        $scope.grid.push(b);
    }
    for(let i = 0; i < 11; i++) {
        for(let j = 0; j < 15; j++) {
            if(i-1 > 0) $scope.grid[i][j].connected.push($scope.grid[i-1][j]);
            if(i+1 < 11) $scope.grid[i][j].connected.push($scope.grid[i+1][j]);
            if(j-1 > 0) $scope.grid[i][j].connected.push($scope.grid[i][j-1]);
            if(j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i][j+1]);
            if(i-1 > 0 && j-1 > 0) $scope.grid[i][j].connected.push($scope.grid[i-1][j-1]);
            if(i+1 < 11 && j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i+1][j+1]);
        }
    }

}]);
