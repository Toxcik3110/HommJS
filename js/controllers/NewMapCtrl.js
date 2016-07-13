app.controller('NewMapCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();

    $scope.imgs = [];
    $scope.state = 'newMap';
    var landGrid = [];
    var waterGrid = [];
    var firstAvailable = true;
    $scope.output = [];
    $scope.blocked = false;
    $scope.exit = function() {
        $state.go("menu");
    }

    $scope.path = [];
    $scope.selectedObj = null;
    $scope.owner = "red";

    $scope.select = function(img) {
        $scope.path = [];
        console.log("trying select");
        if(img.owner == $scope.owner) {

            console.log("selected " + JSON.stringify(img));
            $scope.selectedObj = img;
        } else if($scope.selectedObj && $scope.selectedObj.type == "hero") {
            let sel = $scope.selectedObj;
            let level = img.type == "water" ? waterGrid : landGrid;
            let level2 = [];
            for(let i = 0; i < level.length; i++) {
                level2.push(level[i].map(s => s));
            }
            //level2[0][0] = 1;
            level2[sel.y][sel.x] = 1;
            level2[img.y][img.x] = 0;
            $scope.path = buildPath(sel, img, level2);
            //console.log(landGrid);
            console.log(level2);
            //console.log(path);
            // console.log("moving");
        }
    }

    var buildPath = function(a, b, c) {
        let path = c;
        console.log("a");
        console.log(a);
        console.log("b");
        console.log(b);
        // let ty = a;
        // let buf = a.x;
        // ty.x = a.y;
        // ty.y = buf;
        //a = ty;
        let aAr = [a];
        let step = 1;
        let endLoop = false;
        let last = b;
        while (!endLoop) {
            let i = 0;
            console.log("iteration", step-1);
            if(aAr.length == 0) return [];
            c.map(s => console.log(s.slice()));
            let al = aAr.length;
            console.log(al);
            while(i < al) {
                if(path[aAr[i].y][aAr[i].x] === 0) path[aAr[i].y][aAr[i].x] = step;
                let checkFunc = function(x, y) {
                    // console.log("checkA, x: " + x + ", y:" + y );
                    let checkX, checkY, checkEmpty;
                    checkX = (x >= 0 && x < path.length);
                    if(checkX) {
                        checkY = (y >= 0 && y < path[x].length);
                        // console.log("passed checkX");
                    }
                    if(checkY) {
                        // console.log("passed checkY");
                        console.log("path["+x+"]["+y+"]:" + path[x][y]);
                        checkEmpty = path[x][y] === 0;
                    }
                    if(checkEmpty) {
                        console.log("passed checkE");
                        aAr.push({
                            x:y,
                            y:x
                        });
                        if(x == b.y && y == b.x) {
                            switch (b.type) {
                                case "land":
                                case "water":
                                path[x][y] = step+1;
                                break;
                                default:

                                break;
                            }
                            console.log("MEET");
                            console.log(b);
                            console.log(x,y);
                            endLoop = true;
                            return true;
                        }
                        return true;
                    }
                    return true;
                }

                if(!checkFunc(aAr[i].y-1, aAr[i].x-1)) break;
                if(!checkFunc(aAr[i].y-1, aAr[i].x)) break;
                if(!checkFunc(aAr[i].y-1, aAr[i].x+1)) break;
                if(!checkFunc(aAr[i].y, aAr[i].x-1)) break;
                if(!checkFunc(aAr[i].y, aAr[i].x+1)) break;
                if(!checkFunc(aAr[i].y+1, aAr[i].x-1)) break;
                if(!checkFunc(aAr[i].y+1, aAr[i].x)) break;
                if(!checkFunc(aAr[i].y+1, aAr[i].x+1)) break;
                // aAr.shift();
                i++;
            }
            // i = 0;
            for(let j = 0; j < al; j++) {
                aAr.shift();
            }
            step++;
        }
        let superPath = [];
        if(endLoop == true) {
            let max = -1;
            let x = 0;
            let y = 0;
            for (let i = 0; i < path.length; i++) {
                for (let j = 0; j < path[i].length; j++) {
                    if(max < path[i][j]) {
                        max = path[i][j];
                        y = i;
                        x = j;
                    }
                }
            }
            c.map(s => console.log(s.slice()));
            console.log("x and y",x,y);
            console.log("max", max);
            console.log(path);
            let elem = path[y][x];
            console.log("elem", elem);
            //console.log(path);
            superPath.push({x:x, y:y, path:"pathEnd"});
            //return;
            //return;
            let counter = 0;
            while(elem > 1) {
                console.log("superPathStep");
                console.log(elem);
                console.log(superPath.slice());
                function addToPath(x1,y1) {
                    if(x1 >= 0 && y1 >= 0 && y1 <= path.length-1 && x1 <= path[y1].length-1 )
                    if(path[y1][x1] == elem-1) {
                        elem = path[y1][x1];
                        x = x1;
                        y = y1;
                        superPath.push({'x':x1, 'y':y1, path:"path"});
                        return true;
                    }
                    return false;
                }
                addToPath(x-1,y)||
                addToPath(x,y-1)||
                addToPath(x+1,y)||
                addToPath(x,y+1)||
                addToPath(x-1,y-1)||
                addToPath(x-1,y+1)||
                addToPath(x+1,y-1)||
                addToPath(x+1,y+1);
                counter++;
                if (counter > 10) return;
            }
            //$scope.selectedObj.x = b.x;
            //$scope.selectedObj.y = b.y;
        }
        superPath.pop();
        console.log("path");
        console.log(path);
        console.log("superPath");
        console.log(superPath);
        return superPath;
    }

    function moving(n,i) {
        setTimeout(() => {

            let x = $scope.path[$scope.path.length-1].x;
            $scope.selectedObj.x = x;
            let y = $scope.path[$scope.path.length-1].y;
            $scope.selectedObj.y = y;
            console.log("move to ",x,y);
            $scope.path.pop();
            $scope.$apply();
        }, (n-i)*500);
    }

    $scope.moveTo = function(img) {
        // console.log("trying move");
        // console.log($scope.selectedObj);
        // console.log("to");
        // console.log(img);
        if(img.path == "pathEnd") {
            let n = $scope.path.length;
            landGrid[img.y][img.x] = -1;
            landGrid[$scope.selectedObj.y][$scope.selectedObj.x] = 0;
            for(let i = n-1; i >= 0; i--) {
                moving(n,i);
            }
        }
        //setTimeout(() => $scope.$apply(), (n)*500+10);
    }


    $scope.generateLevel = function() {
        $scope.level = JSON.parse(JSON.stringify(newMap.map));
        let q = $scope.level.ground;
        let w = [];
        let l = [];
        for(let i = 0; i < q.length; i++) {
            if(q[i].type == "water") {
                w.push(0);
                l.push(-1);
            } else if (q[i].type == "land") {
                w.push(-1);
                l.push(0);
            }
            if((i + 1) % newMap.height == 0) {
                landGrid.push(l);
                waterGrid.push(w);
                l = [];
                w = [];
            }
        }
        q = $scope.level.terrain;
        w = [];
        l = [];
        for(let i = 0; i < q.length; i++) {
            if(q[i]) {
                landGrid[q[i].y][q[i].x] = -1;
                waterGrid[q[i].y][q[i].x] = -1;
            }
        }
        q = $scope.level.structures;
        w = [];
        l = [];
        for(let i = 0; i < q.length; i++) {
            if(q[i]) {
                landGrid[q[i].y][q[i].x] = -1;
                waterGrid[q[i].y][q[i].x] = -1;
            }
        }
        q = $scope.level.objects;
        w = [];
        l = [];
        for(let i = 0; i < q.length; i++) {
            if(q[i]) {
                landGrid[q[i].y][q[i].x] = -1;
                waterGrid[q[i].y][q[i].x] = -1;
            }
        }
        console.log($scope.level);
        console.log(landGrid);
    }

    $scope.generateLevel();

    //Todo

    $scope.getCastle = function() {
        
    }

}])
.filter('stringFilter', function() {
    return function(input) {
        // console.log(input);
        return input.type + "_" + input.biom;
    }
});
