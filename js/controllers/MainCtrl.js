app.controller('MainCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();

    window.addEventListener('keypress', function (event) {
        console.log("keypress");
        $scope.move(event);
    });
    $scope.state = 'game';
    var grid = [];
    var firstAvailable = true;
    $scope.output = [];
    $scope.blocked = false;
    $scope.exit = function() {
        $state.go("menu");
    }

    var closeApp = function() {
    }
    // document.getElementById('eventHandler').focus();
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
                if($scope.blocked == false) {
                    $scope.move1(x,y,deltaX,deltaY);
                }
                break;
            case 100: //D
                deltaX = 1;
                if($scope.blocked == false) {
                    $scope.move1(x,y,deltaX,deltaY);
                }
                break;
            case 119: //W
                deltaY = -1;
                if($scope.blocked == false) {
                    $scope.move1(x,y,deltaX,deltaY);
                }
                break;
            case 115: //S
                deltaY = 1;
                if($scope.blocked == false) {
                    $scope.move1(x,y,deltaX,deltaY);
                }
                break;
            case 32:

                break;
            case 13:
                $state.go('menu');
                break;
        }
    }

    $scope.move1 = function(x, y, deltaX, deltaY) {
        var a = $scope.grid[y+deltaY][x+deltaX].value;
        var b = $scope.grid1[y+deltaY][x+deltaX].value;
        var c = $scope.grid2[y+deltaY][x+deltaX].value;
        console.log(a,b,c);
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
            $state.go('menu')
        }
        $scope.$apply();
    }

    $scope.hero = {
        'x':'0',
        'y':'0',
        'hp':100,
        'dmg':4
    };

    $scope.generateLevel = function() {
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < 20; j++) {
                var x = j*100 + "px";
                var y = i*100 + "px";
                if ((j > 3 && j < 8 && i > 2 && i < 19) ||
                 (j > 0 && j < 4 && i > 0 && i < 5) ||
                 (j > 2 && j < 18 && i > 15 && i < 19)) {
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
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < 20; j++) {
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
        for (var i = 0; i < 20; i++) {
            var row = [];
            for (var j = 0; j < 20; j++) {
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

}])
.filter('rowFilter', function() {
    return function(input, hero) {
        // console.log(input);
        if ((input[0].y <= (hero.y + 5)) && (input[0].y >= (hero.y - 5))) {
            return input;
        }
    }
})
.filter('colFilter', function() {
    return function(input, hero) {
        if ((input.x <= (hero.x + 5)) && (input.x >= (hero.x - 5))) {
            return input;
        }
    }
});
