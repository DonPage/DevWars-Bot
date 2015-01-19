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

      .when("/highscore", {
        controller: "hsController",
        templateUrl: "views/highscore.html"
      })

      .otherwise({
        redirectTo: "/"
      })
  })

  .controller("homeController", function ($scope) {

  })

  .controller("playController", function ($scope, $firebase) {

    var ref = new Firebase("https://devwars.firebaseio.com/");
    var fb = $firebase(ref);

    var syncObj = fb.$asObject();
    syncObj.$bindTo($scope, "room");


  })

  .controller("hsController", function($scope, $firebase){

    var hsRef = new Firebase("https://devwars.firebaseio.com/score");
    var fb = $firebase(hsRef);

    var hsArray = fb.$asArray();

    console.log("hsObj:", hsArray);

    $scope.hs = hsArray;




  });
