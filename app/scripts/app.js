/**
 * Created by donpage on 1/13/15.
 */


angular.module('devwars', ['ngRoute', 'firebase', 'angularMoment'])


  .constant('FIREBASE_URI', 'https://devwars.firebaseio.com/')//this is where the database is.


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

  .controller("playController", function($scope){

  });
