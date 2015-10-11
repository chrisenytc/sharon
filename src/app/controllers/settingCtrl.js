/*
 * Controller: settingCtrl
 */

module.exports = function(app, window) {
	return app.controller('settingCtrl', ['$scope', 'Wave', function settingCtrl($scope, Wave) {
		//Page
		Wave.start();
	}]);
};
