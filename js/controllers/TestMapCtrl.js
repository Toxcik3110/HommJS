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

    $scope.moveTo = function(img) {
        console.log("trying move");
        console.log($scope.selectedObj);
        if($scope.selectedObj && !img.obstacle && (!img.water)) {
            $scope.selectedObj.x = img.x;
            $scope.selectedObj.y = img.y;
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
