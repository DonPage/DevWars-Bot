/**
 * Created by donpage on 1/13/15.
 */


angular.module('devwars', ['ngRoute', 'firebase', 'angularMoment'])


  .run(function (amMoment) {
    amMoment.changeLocale('de');
  })


  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "homeController",
        templateUrl: "views/home.html"
      })

      .when("/play", {
        controller: "playController",
        templateUrl: "views/play.html"
      })

      .otherwise({
        redirectTo: "/"
      })
  })

  .controller("homeController", function($scope){
    $scope.testing = 'got test'
  })

  .controller("playController", function($scope, $firebase){

    var ref = new Firebase("https://devwars.firebaseio.com/");
    var fb = $firebase(ref);

    var syncObj = fb.$asObject();
    syncObj.$bindTo($scope, "room");



  });
