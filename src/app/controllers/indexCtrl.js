/*
 * Controller: indexCtrl
 */

module.exports = function(app, window) {
	return app.controller('indexCtrl', ['$scope', 'Auth', 'WindowSize', 'Wave', function indexCtrl($scope, Auth, WindowSize, Wave) {
		//Page
		WindowSize.set();
		//Check user
		if(Auth.logged()) {
			//Commands
			var commands = {
				'hello world': function() {
					$scope.context = 'You have 5 issues assigned to you.';
					$scope.$apply();
				}
			};
			annyang.addCommands(commands);
			annyang.addCallback('start', function () {
				console.log('Start');
				Wave.start(0.1, 0.1);
				$scope.context = 'Go ahead, I\'m listening..';
				$scope.$apply();
			});
			annyang.addCallback('error', function () {
				$scope.context = 'Sorry, I\'m not sure what you said.';
				$scope.$apply();
				Wave.stop(true);
				console.log('Error');
			});
			annyang.addCallback('end', function () {
				console.log('Finish');
				this.start({ autoRestart: false });
			});
			annyang.addCallback('result', function (userSaid, commandText, phrases) {
				$scope.context = userSaid[0];
				$scope.$apply();
				Wave.stop(true);
			});
			annyang.start({ autoRestart: false });
		}
	}]);
};
