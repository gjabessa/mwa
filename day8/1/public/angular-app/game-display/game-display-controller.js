angular.module("meanGames").controller("GameController", GameController);

function _getStarsArray(rating) {
    return new Array(rating);
}

function GameController(GamesDataFactory, $routeParams) {
    const vm = this;
    const gameId = $routeParams.id;
    GamesDataFactory.getOne(gameId).then(function (response) {
        console.log(response)
        vm.game = response;
        vm.stars = _getStarsArray(vm.game.rate)
    });


}