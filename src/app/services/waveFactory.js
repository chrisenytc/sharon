/*
 * Service: Wave
 */

module.exports = function(app, window) {
	return app.factory('Wave', function ($window) {
		return {
			start: function (speed, amplitude) {
				//Siri Wave
				window.siriContainer = $window.document.getElementById('voice-container');
				window.siriContainer.classList.remove('hide');
				if(!window.siriWave) {
					window.siriWave = new SiriWave9({
						width: 350,
						height: 48,
						speed: speed,
						amplitude: amplitude,
						container: siriContainer,
						autostart: true
					});
				} else {
					window.siriWave.speed = speed;
					window.siriWave.amplitude = amplitude;
				}
			},
			stop: function(force) {
				if(window.siriWave) {
					window.siriWave.speed = 0.1;
					window.siriWave.amplitude = 0.1;
				}
				if(force) {
					window.siriContainer.classList.add('hide');
				}
			}
		};
	});
};
