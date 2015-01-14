/**
 * Created by donpage on 1/14/15.
 */

var Firebase = require("firebase");
var ref = new Firebase("https://devwars.firebaseio.com/");

var bot = require('./secret.js');


bot.addCommand(
  '@calc', function (i) {
    var answer = null;
    var n1 = parseInt(i.args[0]);
    var method = String(i.args[1]);
    var n2 = parseInt(i.args[2]);
    console.log(n1, method, n2);
    if (method == '-') {
      answer = n1 - n2;
      console.log(answer);
    }
    else if (method == '*') {
      answer = n1 * n2;
    }
    else if (method == '+') {
      answer = n1 + n2;
    }
    else if (method == '/') {
      answer = n1 / n2;
    }
    return 'answer: ' + answer;
  }
);
