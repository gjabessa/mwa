angular.module("meanGames").controller("GameController", GameController);

function _getStarsArray(rating) {
    return new Array(rating);
}

function GameController(GamesDataFactory, $routeParams, AuthFactory) {
    const vm = this;
    const gameId = $routeParams.id;
    vm.isLoggedIn = function() {
        return AuthFactory.auth;
    }
    GamesDataFactory.getOne(gameId).then(function (response) {
        console.log(response)
        vm.game = response;
        vm.stars = _getStarsArray(vm.game.rate)
    });
    vm.deleteGame = function () {
        const gameId = $routeParams.id;
        
        GamesDataFactory.delete(gameId).then(function (response) {
            console.log("Game removed");
        }).catch(function (error) {
            console.log("Error while deleting ", error)
        })

    };

}