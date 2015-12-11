/*
 *
 * Module Dependencies
 *
 * */

var menubar = require('menubar');

require('crash-reporter').start();

var mb = global.mb = menubar({
	width: 350,
	height: 160,
	y: 30,
	preloadWindow: true
});

mb.on('ready', function ready () {
	console.log('Sharon is ready to use!');
	mb.window.openDevTools({detach: true});
});
