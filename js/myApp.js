var app = angular.module('myApp', []);
app.controller("MainCtrl", ['$rootScope', '$scope', function($rootScope, $scope) {
    var grid = [];
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            row.push({'value':i + ' ' + j});
        }
        grid.push(row);
    }
    $scope.grid = grid;
}]);
