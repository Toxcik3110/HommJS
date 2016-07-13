app.service('CastleService', ['$scope', function($scope) {
    // TODO: store global data here

    let castles = [];
    let heroes = [];

    // TODO: do it on promises

    let getCastleById = function(id) {
        for (let i = 0; i < castles.length; i++) {
            if(castles[i].id == id) {
                return castles[i];
            }
        }
        return -1;
    }

    let addHero = function(hero) {
        heroes.push(hero);
    }

    let removeHeroById = function(id) {
        for (let i = 0; i < heroes.length; i++) {
            if(heroes[i].id == id) {
                heroes.splice(i,1);
                return i;
            }
        }
    }

    let addCastle = function(castle) {
        castles.push(castle);
    }

    let removeCastleById = function(id) {
        for (let i = 0; i < castles.length; i++) {
            if(castles[i].id == id) {
                castles.splice(i,1);
                return i;
            }
        }
    }

    let getHeroById = function(id) {
        for (let i = 0; i < heroes.length; i++) {
            if(heroes[i].id == id) {
                return heroes[i];
            }
        }
        return -1;
    }
}]);
