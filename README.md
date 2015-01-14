# DevWars Twitch Bot & Interface

## What is DevWars?

 Two teams of three battle to produce the best work of their coding ability, taking the reigns of a single programming language each: HTML, CSS and JavaScript.

## What is this repo?

There are two parts to this project:

- `bot` - Allows people to join a programming language position through twitch chat. Example: !join js donpage. This will put you on a blue or red team Javascript position. The {donpage} is your c9 account name.
- `app` - Using Web Starter Kit, Angular, and Firebase, this project main focus is performance and 3-way-binding between front-end and servers. Allowing the user to see open positions without a page reload while also available on mobile browsers.

## Dev Notes

Made by: Don Page - DivineDon (twitch)
I've used Bootstrap and Foundation before but wanted to try something new, [Web Starter Kit by Google](https://developers.google.com/web/starter-kit/).

### How to Install:

The dependencies are:
* [Node.js](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org/)
* [gulp.js](http://gulpjs.com)
* [Sass](http://sass-lang.com/install)

Once you have that you can run this command:
```sh
$ sudo npm install
```
*Note: If you get an ERR, make sure you have the latest version of npm*

If you are having problems you can view the install file in the docs folder.

### How to Contribute
I will list what you need to know and what files are okay to edit when trying to contribute to different aspects of the project:

#### Design: 
- `Sass` - *Make sure to have a good understanding of scss. If you want to create different .scss files inside the styles folder is okay, just make sure you @import then into main.*
- `HTML` - *Basic understanding is required.*
```
app/styles/main.scss
app/views/*.html
```

---

#### Front-end
- `Angular` - *Angular is the MVC framework chosen for this project. Intermediate understanding of how it works is needed to make changes.*
- `AngularFire` - *Make sure you are up to date with the recent changes from 0.7.0 to 0.9.0. [changelog](https://www.firebase.com/docs/web/libraries/angular/changelog.html).*
- `jQuery` - *Basic understanding is required.*
```
app/scripts/app.js
```

---

#### Back-end
- `NodeJS` - *Basic understanding of JavaScript is needed to edit.*
- `Firebase` - *Intermediate understanding is required.*
```
bot.js
```






