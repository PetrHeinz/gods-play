# God's Play

## Introduction

God's Play is a multiplayer turn-based tactical game about mages trying to destroy each other.
As they fight they spread havoc and destruction around themselves without considering consequences.

This game is created as a pet project to try out [ES6 features](http://es6-features.org/), [PIXI.js](http://www.pixijs.com/), and practice programming the way I want, without the pressure of deadlines and clients.
A big inspiration for this game was a great multiplayer game [Greed Corp](http://store.steampowered.com/app/48950/Greed_Corp/).

**The game is deployed live on [http://puzzle.php5.cz/gods-play/](http://puzzle.php5.cz/gods-play/).**  
*But there might not always be the up-to-date version.*

There are in-game descriptions of the rules.

## Installation

You can install and run the application on a local machine via [Yarn](https://yarnpkg.com/) commands: 
```
yarn install
yarn start
```

That compiles and builds ES6 modules into JS executable in a browser via [Webpack](https://webpack.github.io/) and starts the application in your default browser.
The application runs in watch mode - when any source file is modified it is automatically rebuilt and the browser page refreshes.
 
If you do not have Yarn installed on your machine you can use [npm](https://www.npmjs.com/) in pretty much the same way: 
```
npm install
npm start
```


## Coding Standards

The code is [JavaScript Standard Style](https://standardjs.com/) compliant which can be checked and automatically fixed by:
```
yarn run test
yarn run fix
```

There are no automatic tests at the moment.
