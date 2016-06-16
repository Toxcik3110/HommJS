app.controller('TestMapCtrl', ['$rootScope', '$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout) {
    // document.activeElement = document.getElementById('eventHandler');
    //document.getElementById('eventHandler').focus();

    $scope.imgs = [];
    $scope.state = 'testMap';
    var grid = [];
    var firstAvailable = true;
    $scope.output = [];
    $scope.blocked = false;
    $scope.exit = function() {
        $state.go("menu");
    }

    $scope.selectedObj = null;
    $scope.owner = "red";

    $scope.select = function(img) {
        console.log("trying select");
        if(img.owner == $scope.owner) {
            console.log("selected " + img);
            $scope.selectedObj = img;
        } else if($scope.selectedObj) {

        }
    }

    var buildPath = function(a, b) {
        let matr = [];
        let maxX = 0;
        for(let i = 0; i < $scope.imgs.length; i++) {
            let notObstacle = !$scope.imgs[i].water && !$scope.imgs[i].obj && !$scope.imgs[i].obstacle && !matr[i];
            if (notObstacle) {
                matr[i] = 0;
            } else {
                matr[i] = -1;
            }
            if(maxX < $scope.imgs[i].x) {
                maxX = $scope.imgs[i].x;
            }
        }
        // console.log(matr);
        let path = [];
        for(let i = 0; i <= maxX; i++) {
            // console.log(matr.slice(i*maxX, i*maxX + maxX + 1));
            path.push(matr.slice(i*maxX, i*maxX + maxX + 1))
        }
        console.log("a");
        console.log(a);
        console.log("b");
        console.log(b);
        let aAr = [a];
        let bAr = [b];
        let step = 0;
        let endLoop = false;
        while (endLoop == false && step < 15) {
            let i = 0;
            console.log("iteration");
            let al = aAr.length;
            while(i < al) {
                path[aAr[i].x][aAr[i].y] = "a" + step;

                let checkFunc = function(x, y) {
                    console.log("checkA, x: " + x + ", y:" + y);
                    let checkX, checkY, checkEmpty;
                    checkX = (x >= 0 && x < path.length);
                    if(checkX) {
                        checkY = (y >= 0 && y < path[x].length);
                        // console.log("passed checkX");
                    }
                    if(checkY) {
                        // console.log("passed checkY");
                        let str = path[x][y] + "";
                        checkEmpty = path[x][y] != -1 && !str.startsWith("a");
                    }
                    if(checkEmpty) {
                        // console.log("passed checkE");
                        aAr.push({
                            x:x,
                            y:y
                        });
                        let str = path[x][y] + "";
                        if(str.startsWith("b")) {
                            console.log("MEET");
                            endLoop = true;
                            return false;
                        }
                        return true;
                    }
                    return true;
                }

                if(!checkFunc(aAr[i].x-1, aAr[i].y-1)) break;
                if(!checkFunc(aAr[i].x-1, aAr[i].y)) break;
                if(!checkFunc(aAr[i].x-1, aAr[i].y+1)) break;
                if(!checkFunc(aAr[i].x, aAr[i].y-1)) break;
                if(!checkFunc(aAr[i].x, aAr[i].y+1)) break;
                if(!checkFunc(aAr[i].x+1, aAr[i].y-1)) break;
                if(!checkFunc(aAr[i].x+1, aAr[i].y)) break;
                if(!checkFunc(aAr[i].x+1, aAr[i].y+1)) break;
                // aAr.shift();
                i++;
            }
            for(let j = 0; j < i; j++) {
                aAr.shift();
            }
            let bl = bAr.length;
            i = 0;
            while(i < bl) {
                path[bAr[i].x][bAr[i].y] = "b" + step;

                let checkFunc = function(x, y) {
                    console.log("checkB, x: " + x + ", y:" + y);
                    let checkX, checkY, checkEmpty;
                    checkX = (x >= 0 && x < path.length);
                    if(checkX) {
                        checkY = (y >= 0 && y < path[x].length);
                        // console.log("passed checkX");
                    }
                    if(checkY) {
                        // console.log("passed checkY");
                        let str = path[x][y] + "";
                        checkEmpty = path[x][y] != -1 && !str.startsWith("b");
                    }
                    if(checkEmpty) {
                        // console.log("passed checkE");
                        bAr.push({
                            x:x,
                            y:y
                        })
                        let str = path[x][y] + "";
                        if(str.startsWith("a")) {
                            console.log("MEET");
                            endLoop = true;
                            return false;
                        }
                        return true;
                    }
                    return true;
                }

                if(!checkFunc(bAr[i].x-1, bAr[i].y-1)) break;
                if(!checkFunc(bAr[i].x-1, bAr[i].y)) break;
                if(!checkFunc(bAr[i].x-1, bAr[i].y+1)) break;
                if(!checkFunc(bAr[i].x, bAr[i].y-1)) break;
                if(!checkFunc(bAr[i].x, bAr[i].y+1)) break;
                if(!checkFunc(bAr[i].x+1, bAr[i].y-1)) break;
                if(!checkFunc(bAr[i].x+1, bAr[i].y)) break;
                if(!checkFunc(bAr[i].x+1, bAr[i].y+1)) break;

                i++;
            }
            for(let j = 0; j < i; j++) {
                bAr.shift();
            }
            step++;
        }
        if(endLoop == true) {
            $scope.selectedObj.x = b.x;
            $scope.selectedObj.y = b.y;
        }
        console.log(path);
        return path;
    }

    $scope.moveTo = function(img) {
        console.log("trying move");
        console.log($scope.selectedObj);
        if($scope.selectedObj && (!img.obstacle) && (!img.water)) {
            if(img.obj) {
                //use obj
            } else if (img.owner) {

            }
            let path = buildPath($scope.selectedObj, img);
            console.log(path);
            // let index = 0;
            // for (let i = 0; i < $scope.imgs.length; i++) {
            //     if($scope.imgs[i] == $scope.selectedObj) {
            //         index = i;
            //         console.log(index);
            //     }
            // }
            //$scope.selectedObj.x = img.x;
            //$scope.selectedObj.y = img.y;
            // $scope.imgs[index] = $scope.selectedObj;
            // $scope.imgs[img.x + img.y * testMap.size].x = img.x;
            console.log("moving");
        }
    }

    var closeApp = function() {
    }
    // document.getElementById('eventHandler').focus();


    $scope.generateLevel = function() {
        for(let i = 0; i < testMap.map.length; i++) {
            let obj = testMap.map[i];
            $scope.imgs.push(testMap.map[i]);
        }
    }

    $scope.generateLevel();

}])
.filter('terrainFilter', function() {
    return function(input) {
        // console.log(input);
        if(input.water) {
            return "water"
        } else {
            if(input.biom) return input.biom;
        }
        return "void";
    }
})
.filter('objectFilter', function() {
    return function(input) {
        // console.log(input);
        if(input.obj) return input.obj;
        return "void";
    }
});
