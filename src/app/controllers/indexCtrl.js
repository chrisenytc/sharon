/*
 * Controller: indexCtrl
 */

module.exports = function(app, window) {
	return app.controller('indexCtrl', ['$scope', 'Wave', function indexCtrl($scope, Wave) {
		//Commands
		var commands = {
			'hello world': function() {
				$scope.context = 'You have 5 issues assigned to you.';
				$scope.$apply();
				console.log('You have 5 issues assigned to you.');
			}
		};
		annyang.addCommands(commands);
		annyang.addCallback('start', function () {
			console.log('Start');
			Wave.start(0.1, 0.1);
			setTimeout(function() {
				Wave.start(0.1, 1);
			}, 3000);
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
			setTimeout(function() {
				this.start({ autoRestart: false });
			}.bind(this), 5000);
		});
		annyang.addCallback('result', function (userSaid, commandText, phrases) {
			$scope.context = userSaid[0];
			$scope.$apply();
			Wave.stop(true);
		});
		annyang.debug();
		annyang.start({ autoRestart: false });
	}]);
};
