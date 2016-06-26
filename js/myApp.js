var app = angular.module('myApp', ['ui.router']);
app.run(function($rootScope, $state) {
    $rootScope.interfaceScale = 2;
    $state.go('menu');
});
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("menu");
  //
  // Now set up the states
  $stateProvider
    .state('game', {
      url: "",
      templateUrl: "pages/main.html",
      controller: 'MainCtrl'
    })
    .state('menu', {
      url: "",
      templateUrl: "pages/menu.html",
      controller: 'MenuCtrl'
    })
    .state('testMap', {
      url: "",
      templateUrl: "pages/testMap.html",
      controller: 'TestMapCtrl'
    })
    .state('newMap', {
      url: "",
      templateUrl: "pages/newMap.html",
      controller: 'NewMapCtrl'
    })
});
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
            // case 2:
            //     return 'exit';
            //     break;
            default:
                return 'void';
        }
    }
});
app.filter('xToScreen', function() {
    return function(input, hero) {
        var offset = 5;
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        input = input - hero.x + offset;
        return (input * (x/22.5)) + 'px';
    }
});
app.filter('yToScreen', function() {
    return function(input, hero) {
        var offset = 6;
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        input = input - hero.y + offset;
        return (input * ((y)/13)) + 'px';
    }
});
