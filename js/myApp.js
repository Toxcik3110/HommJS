var app = angular.module('myApp', ['ui.router']);
// app.run(function($rootScope, $urlProvider, $state) {
//     $state.go('home');
// });
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "home",
      templateUrl: "pages/main.html",
    //   controller: 'MainCtrl'
    })
});
app.controller("MainCtrl", ['$rootScope', '$scope', function($rootScope, $scope) {
    var grid = [];
    var firstAvailable = true;
    $scope.output = [];
    $scope.move = function(input) {
        console.log(input.keyCode);
        console.log($scope.grid);
        var x = $scope.hero.x;
        var y = $scope.hero.y;
        var deltaX = 0;
        var deltaY = 0;
        switch (input.keyCode) {
            case 97:  //A
                deltaX = -1;
                move(x,y,deltaX,deltaY);
                break;
            case 100: //D
                deltaX = 1;
                move(x,y,deltaX,deltaY);
                break;
            case 119: //W
                deltaY = -1;
                move(x,y,deltaX,deltaY);
                break;
            case 115: //S
                deltaY = 1;
                move(x,y,deltaX,deltaY);
                break;
        }
    }

    var move = function(x, y, deltaX, deltaY) {
        var a = $scope.grid[y+deltaY][x+deltaX].value;
        var b = $scope.grid1[y+deltaY][x+deltaX].value;
        var c = $scope.grid2[y+deltaY][x+deltaX].value;
        if(a == 0 && b == 0 && c == 0) {
            $scope.hero.x += deltaX;
            $scope.hero.y += deltaY;
            if(deltaX == -1) $scope.output.push({"value":"You've moved left"});
            if(deltaX == 1) $scope.output.push({"value":"You've moved right"});
            if(deltaY == -1) $scope.output.push({"value":"You've moved up"});
            if(deltaY == 1) $scope.output.push({"value":"You've moved down"});
        }
        if(c == 1) {
            var monsterDMG = $scope.grid2[y+deltaY][x+deltaX].dmg;
            $scope.grid2[y+deltaY][x+deltaX].hp -= $scope.hero.dmg;
            $scope.hero.hp -= monsterDMG;
            $scope.output.push({"value":"You've been hit by " + monsterDMG});
            $scope.output.push({"value":"You've hit monster by " + $scope.hero.dmg});
            if($scope.grid2[y+deltaY][x+deltaX].hp <= 0) {
                $scope.grid2[y+deltaY][x+deltaX].value = 0;
                $scope.output.push({"value":"You've killed the monster!"});
            }
        } else if (c == 2) {
            $scope.hero.x += deltaX;
            $scope.hero.y += deltaY;
            $scope.output.push({"value":"You've finish this level!"});
        }
    }

    $scope.hero = {
        'x':'0',
        'y':'0',
        'hp':100,
        'dmg':4
    };

    $scope.generateLevel = function() {
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                var x = j*100 + "px";
                var y = i*100 + "px";
                if ((j > 3 && j < 8 && i > 2 && i < 9) || (j > 0 && j < 4 && i > 0 && i < 5)) {
                    row.push({'value':0,'x':j,'y':i});
                    if(firstAvailable) {
                        $scope.hero.x = j;
                        $scope.hero.y = i;
                        console.log($scope.hero);
                    }
                    firstAvailable = false;
                } else {
                    row.push({'value':1,'x':j,'y':i});
                }
            }
            grid.push(row);
        }
        var grid1 = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                var x = j*100 + "px";
                var y = i*100 + "px";
                if ((j == 5) && (i > 6 && i < 8)) {
                    row.push({'value':1,'x':j,'y':i});
                } else if ((j == 3) && (i > 3 && i < 5)) {
                    row.push({'value':2,'x':j,'y':i});
                } else{
                    row.push({'value':0,'x':j,'y':i});
                }
            }
            grid1.push(row);
        }
        var grid2 = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                var x = j*100 + "px";
                var y = i*100 + "px";
                if ((j == 6) && (i > 5 && i < 7)) {
                    row.push({'value':1,'x':j,'y':i,'hp':10,'dmg':4});
                } else if ((j == 5) && (i > 3 && i < 5)) {
                    row.push({'value':1,'x':j,'y':i,'hp':10,'dmg':3});
                }else if ((j == 7) && (i == 8)) {
                    row.push({'value':2,'x':j,'y':i});
                } else {
                    row.push({'value':0,'x':j,'y':i});
                }
            }
            grid2.push(row);
        }
        $scope.grid2 = grid2;
        $scope.grid1 = grid1;
        $scope.grid = grid;
    }

    $scope.generateLevel();

}]);
app.filter('firstLayer', function(){
    return function(input) {
        switch (input) {
            case 0:
                return 'grass';
                break;
            case 1:
                return 'water';
                break;
            default:
                return 'void';
        }
    }
});
app.filter('secondLayer', function(){
    return function(input) {
        switch (input) {
            case 0:
                return 'void';
                break;
            case 1:
                return 'tree';
                break;
            case 2:
                return 'rock';
                break;
            default:
                return 'void';
        }
    }
});
app.filter('thirdLayer', function(){
    return function(input) {
        switch (input) {
            case 0:
                return 'void';
                break;
            case 1:
                return 'monster';
                break;
            case 2:
                return 'exit';
                break;
            default:
                return 'void';
        }
    }
});
app.filter('xToScreen', function() {
    return function(input) {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return (input * (x/23)) + 'px';
    }
});
app.filter('yToScreen', function() {
    return function(input) {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return (input * (y/13)) + 'px';
    }
});
