/*
 * Controller: settingCtrl
 */

module.exports = function(app, window) {
	return app.controller('settingCtrl', ['$scope', 'WindowSize', 'GitHub', function settingCtrl($scope, WindowSize, GitHub) {
		//Page
		WindowSize.set(null, 300);

		$scope.login = GitHub.login;
	}]);
};
