/*
 * Service: Wave
 */

module.exports = function(app, window) {
	return app.factory('WindowSize', function ($window) {
		return {
			set: function(width, height) {
				window.mb.window.setSize(width || 350, height || 160);
			},
		};
	});
};

