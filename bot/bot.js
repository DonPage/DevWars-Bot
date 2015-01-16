/**
 * Created by donpage on 1/14/15.
 */

var Firebase = require("firebase");
var ref = new Firebase("https://devwars.firebaseio.com/");

var blueTeam = ref.child("blue");
var redTeam = ref.child("red");
var waiting = ref.child("waitingRoom");

var bot = require('./secret.js');


//listens for changes and adds new players to list.
//TODO: this is unfinished.

var currentPlayers = []; //list of all players that have a position.

function addCurrentPlayer(twitch) {
  if (currentPlayers.indexOf(twitch) === -1) {//not in array
    currentPlayers.push(twitch);
  }
  return console.log(currentPlayers);
}

function removeCurrentPlayer(twitch) {
  if (currentPlayers.indexOf(twitch) > -1) {//is in array
    currentPlayers.splice(currentPlayers.indexOf(twitch), 1);
  }
  return console.log(currentPlayers);
}


bot.addCommand(
  '@join', function (i) { //Format: !join {position} {c9 name}

    var user = i.from;
    var pos = i.args[0];
    var c9 = i.args[1];

    console.log(user, pos, c9);

    //failsafe for different positions (var pos)
    if (pos == 'js' || pos == 'html' || pos == 'css') {

      //failsafe for c9 username. TODO: maybe use c9 api to confirm usernames??? not sure if possible.
      if (c9 == undefined || c9.length < 2) return bot.say(user + ' Wrong Format. {c9}');

      //failsafe if the user already has a spot.
      if (currentPlayers.indexOf(user) > -1) return bot.say(user + " you already have a spot.");

      enterLobby(user, pos, c9);
    } else {
      return bot.say(user + ' Wrong Format. {pos}');
    }
  }
);//!join


function enterLobby(twitch, pos, c9) { //this function just views current position and see if it's open.

  console.log("enterLobby()");

  //check blue team
  blueTeam.child(pos).once("value", function (snap) {
    console.log("checking blueTeam", pos, snap.val());

    if (snap.val() === null || snap.val() === "") {
      //blue team position empty.
      console.log("blue team", pos, "empty");
      addPlayer(twitch, pos, c9, 'blue');
    } else {

      //failsafe if the player is already on blue team, this will update his info
      if (snap.val().twitch === twitch) {
        return updatePlayer(twitch, pos, c9, 'blue');
      }

      //check red team
      redTeam.child(pos).once("value", function (snapR) {//snapR = snap red team
        if (snapR.val() === null || snapR.val() === "") {
          console.log("red team", pos, "empty");
          addPlayer(twitch, pos, c9, 'red');
        }

        //failsafe if the player is already on red team, this will update his info
        if (snapR.val().twitch === twitch) {
          return updatePlayer(twitch, pos, c9, 'red');
        }

      })
    }

  })


}

function addPlayer(twitch, pos, c9, team) {//this actually adds player into position

  addCurrentPlayer(twitch);

  if (team === "blue") {
    blueTeam.child(pos).update({
      twitch: twitch,
      c9: c9,
      joined: Firebase.ServerValue.TIMESTAMP
    });
    return bot.say(twitch + " you were added to the " + team + " team")
  }

  if (team === "red") {
    redTeam.child(pos).update({
      twitch: twitch,
      c9: c9,
      joined: Firebase.ServerValue.TIMESTAMP
    });
    return bot.say(twitch + " you were added to the " + team + " team")
  }

}//addPlayer()

function updatePlayer(twitch, pos, c9, team) {//this updates player info.

  if (team === "blue") {
    blueTeam.child(pos).update({
      c9: c9,
      updated: Firebase.ServerValue.TIMESTAMP
    });
    return bot.say(twitch + " your info was updated")
  }

  if (team === "red") {
    redTeam.child(pos).update({
      c9: c9,
      updated: Firebase.ServerValue.TIMESTAMP
    });
    return bot.say(twitch + " your info was updated")
  }

}//updatePlayer()


bot.addCommand(
  '@clearlobby', function (i) { //this command will clear all positions and waiting list.
    ref.update({
      blue: {
        js: "",
        html: "",
        css: ""
      },

      red: {
        js: "",
        html: "",
        css: ""
      },

      waitingRoom: ""
    });

    currentPlayers = [];

    return bot.say("lobby was cleared");
  }
);//!clearlobby


bot.addCommand(
  '@kick', function (i) {//FORMAT: teamColor position
    var teamColor = i.args[0];
    var pos = i.args[1];

    if (pos == 'js' || pos == 'html' || pos == 'css') {

      if (teamColor == "blue") {

        blueTeam.child(pos).child("twitch").once("value", function (dataSnapshot) {
          console.log("twitch name to remove:", dataSnapshot.val());

          //if position is already empty.
          if (dataSnapshot.val() === null) return bot.say(i.from + ", Nobody in that position.");

          removeCurrentPlayer(dataSnapshot.val());

          blueTeam.child(pos).set("");

          return bot.say("player was kicked from blue team (" + pos + ")");

        }, function (err) {
          return bot.say("something went wrong while kicking.");
        });

      }//kicking player from blue team.

      if (teamColor == "red") {

        redTeam.child(pos).child("twitch").once("value", function (dataSnapshot) {
          console.log("twitch name to remove:", dataSnapshot.val());

          //if position is already empty.
          if (dataSnapshot.val() === null) return bot.say(i.from + ", Nobody in that position.");

          removeCurrentPlayer(dataSnapshot.val());

          redTeam.child(pos).set("");

          return bot.say("player was kicked from red team (" + pos + ")");

        }, function (err) {
          return bot.say("something went wrong while kicking.");
        });
      }//kicking player from red team

    } else {
      //currentPlayers.splice(currentPlayers.indexOf(i.from), 1);
      return bot.say(i.from + " wrong format.");
    }

  }
);//!kick


bot.addCommand(
  '@current', function (i) {
    console.log("current: ", currentPlayers);
  }
);
