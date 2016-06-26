app.controller('CombatTestCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();
    $scope.grid = [];
    $scope.playerMove = "";
    $scope.attack = false;
    $scope.units = [
        {
            "name":"monster1",
            "x":0,
            "y":0,
            "active":false,
            "owner":"left",
            "count":32,
            "shoot":false,
            "fly":false,
            "attack":5,
            "deffence":5,
            "dmg":"1-3",
            "hitPoints":5,
            "speed":4
        },
        {
            "name":"monster1",
            "x":0,
            "y":1,
            "active":false,
            "owner":"left",
            "count":48,
            "shoot":false,
            "fly":false,
            "attack":5,
            "deffence":5,
            "dmg":"1-3",
            "hitPoints":5,
            "speed":4
        },
        {
            "name":"monster2",
            "x":14,
            "y":8,
            "active":false,
            "owner":"right",
            "count":12,
            "shoot":false,
            "fly":false,
            "attack":5,
            "deffence":5,
            "dmg":"1-3",
            "hitPoints":5,
            "speed":4
        }
    ];
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
            if(i % 2 == 0) {
                if(i-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i-1][j]);
                if(i+1 < 11) $scope.grid[i][j].connected.push($scope.grid[i+1][j]);
                if(j-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i][j-1]);
                if(j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i][j+1]);
                if(i-1 >= 0 && j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i-1][j+1]);
                if(i+1 < 11 && j-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i+1][j-1]);
            } else {
                if(i-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i-1][j]);
                if(i+1 < 11) $scope.grid[i][j].connected.push($scope.grid[i+1][j]);
                if(j-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i][j-1]);
                if(j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i][j+1]);
                if(i-1 >= 0 && j-1 >= 0) $scope.grid[i][j].connected.push($scope.grid[i-1][j-1]);
                if(i+1 < 11 && j+1 < 15) $scope.grid[i][j].connected.push($scope.grid[i+1][j+1]);
            }
        }
    }
    for(let i = 0; i < $scope.units.length; i++) {
        $scope.grid[$scope.units[i].y][$scope.units[i].x].value = -1;
    }

    function gameStart() {
        console.log("Game started!");
        if(!$scope.playerMove) {
            $scope.playerMove = "left";
        }
        for(let i = 0; i < $scope.units.length; i++) {
            $scope.units[i].canMove = true;
            $scope.units[i].canCounter = 1;
            $scope.units[i].hp = $scope.units[i].hitPoints;
            $scope.units[i].totalHp = $scope.units[i].hitPoints * $scope.units[i].count;
            if(!$scope.selectedUnit) {
                if($scope.units[i].active == false && $scope.units[i].owner == $scope.playerMove) {
                    $scope.units[i].active = true;
                    $scope.selectedUnit = $scope.units[i];
                }
            }
        }
        highlightCells();
    }

    function gameRestart() {
        console.log("Round!");
        let find = false;
        $scope.selectedUnit = null;
        for(let i = 0; i < $scope.units.length; i++) {
            $scope.units[i].canMove = true;
            $scope.units[i].canCounter = 1;
            if(!$scope.selectedUnit) {
                if($scope.units[i].active == false && $scope.units[i].owner == $scope.playerMove) {
                    $scope.units[i].active = true;
                    find = true;
                    $scope.selectedUnit = $scope.units[i];
                }
            }
        }
        if(!find) alert("end of game");
        else
        highlightCells();
    }

    function chooseNext() {
        $scope.clear();
        let find = false;
        for(let i = 0; i < $scope.units.length; i++) {
            if($scope.units[i].canMove && $scope.units[i].owner == $scope.playerMove) {
                if($scope.units[i].active == false) {
                    $scope.units[i].active = true;
                    find = true;
                    $scope.selectedUnit = $scope.units[i];
                }
            }
        }
        if(!find)
        {
            console.log("RESTART");
            $scope.playerMove = $scope.playerMove == "left" ? "right" : "left";
            if($scope.playerMove != "left")
            chooseNext();
            else
            gameRestart();
        } else {
            highlightCells();

        }
    }

    function highlightCells() {
        let step = 1;//$scope.selectedUnit.speed;
        console.log($scope.selectedUnit);
        let cells = [$scope.grid[$scope.selectedUnit.y][$scope.selectedUnit.x]];
        cells[0].value = step;
        while(step < $scope.selectedUnit.speed+1) {
            console.log("step", step);
            let newCells = [];
            for (let i = 0; i < cells.length; i++) {
                for (let j = 0; j < cells[i].connected.length; j++) {
                    if(cells[i].connected[j].value == 0) {
                        cells[i].connected[j].value = step+1;
                        newCells.push(cells[i].connected[j]);
                    }
                }
            }
            //console.log(cells.slice());
            cells = [];
            for (var i = 0; i < newCells.length; i++) {
                cells.push(newCells[i]);
            }
            step++;
        }
    }

    function highlightCells1(cell) {
        let step = 1;//$scope.selectedUnit.speed;
        console.log($scope.selectedUnit);
        let cells = [];
        for (let j = 0; j < cell.connected.length; j++) {
            //if(cell.connected[j].value != 0) {
                cells.push(cell.connected[j].value);
                //cells.connected[j].value = step+1;
                //newCells.push(cells.connected[j]);
            //}
        }
        $scope.clear();
        for (let j = 0; j < cell.connected.length; j++) {
            cell.connected[j].value = cells[j];
        }
    }

    function checkUnits(unit) {
        let count1 = 0;
        let count2 = 0;
        let index = -1;
        for(let i = 0; i < $scope.units.length; i++) {
            if($scope.units[i].owner == $scope.playerMove) {
                if($scope.units[i] == unit) {
                    index = i;
                } else {
                    count1++;

                }
            }
            if($scope.units[i].owner != $scope.playerMove) {
                if($scope.units[i] == unit) {
                    index = i;
                } else {
                    count2++;

                }
            }
        }
        $scope.units.splice(1,index);
        if(count1 == 0 || count2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    $scope.cellClick = function(cell) {
        if(cell.value == 0) {
            $scope.attack = !$scope.attack;
        } else if (cell.value > 0){
            if($scope.attack) {
                if($scope.selectedEnemy.canCounter > 0) {
                    let ed = $scope.selectedEnemy.dmg.split("-");
                    let ad = $scope.selectedUnit.dmg.split("-");
                    ed = Math.random()*ed[1] + ed[0];
                    ad = Math.random()*ad[1] + ad[0];
                    $scope.selectedUnit.totalHp -= $scope.selectedEnemy.count * ed +
                    Math.ceil($scope.selectedEnemy.count * ed * $scope.selectedEnemy.attack/50) -
                    Math.ceil($scope.selectedEnemy.count * ed * $scope.selectedUnit.deffence/50);

                    let allyDmg = $scope.selectedUnit.count * ad +
                    Math.ceil($scope.selectedUnit.count * ad * $scope.selectedUnit.attack/50) -
                    Math.ceil($scope.selectedUnit.count * ad * $scope.selectedEnemy.deffence/50);

                    console.log("ally dmg:", allyDmg);
                    console.log("enemy hp:", $scope.selectedEnemy.totalHp);

                    $scope.selectedEnemy.totalHp -= allyDmg;

                    $scope.selectedEnemy.hp = $scope.selectedEnemy.totalHp % $scope.selectedEnemy.hitPoints;
                    $scope.selectedEnemy.count = Math.ceil($scope.selectedEnemy.totalHp / $scope.selectedEnemy.count);
                    $scope.selectedUnit.hp = $scope.selectedUnit.totalHp % $scope.selectedUnit.hitPoints;
                    $scope.selectedUnit.count = Math.ceil($scope.selectedUnit.totalHp / $scope.selectedUnit.count);
                    $scope.selectedEnemy.canCounter--;
                    if($scope.selectedEnemy.totalHp <= 0) {
                        if(checkUnits($scope.selectedEnemy)) {
                            alert("VICTORY");
                            return;
                        }
                    } else if ($scope.selectedUnit.totalHp <= 0) {
                        if(checkUnits($scope.selectedUnit)) {
                            alert("LOOSE");
                            return;
                        }

                    }
                }
            }
            $scope.grid[$scope.selectedUnit.y][$scope.selectedUnit.x].value = 0;
            $scope.selectedUnit.x = cell.x;
            $scope.selectedUnit.y = cell.y;

            console.log("step", cell.value);
            $scope.grid[cell.y][cell.x].value = -1;
            //$scope.grid.map(s => console.log(s.slice().map(x => x.value)));

            $scope.selectedUnit.canMove = false;
            $scope.selectedUnit.active = false;
            chooseNext();
        }
    }

    $scope.select = function(cell) {
        if(cell.owner != $scope.playerMove && !$scope.attack) {
            $scope.selectedEnemy = cell;
            $scope.attack = true;
            highlightCells1($scope.grid[cell.y][cell.x]);
        } else if(cell.owner != $scope.playerMove && $scope.attack) {
            $scope.attack = false;
            $scope.clear();
            highlightCells();
        }
    }

    $scope.clear = function (){
        for(let i = 0; i < 11; i++) {
            for(let j = 0; j < 15; j++) {
                if($scope.grid[i][j].value > 0) $scope.grid[i][j].value = 0;
                //$scope.grid[i][j].active = false;
            }
        }
    }
    gameStart();

}]);
