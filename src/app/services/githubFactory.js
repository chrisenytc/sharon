/*
 * Service: Auth
 */

var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
var Request = require('../../../lib/request.js');
var request = new Request();

module.exports = function(app, window) {
	return app.factory('GitHub', function ($state, Auth) {
		return {
			login: function() {
				var getGithubToken = function (options, code) {
					request
					.post('https://github.com/login/oauth/access_token', {
						client_id: options.client_id,
						client_secret: options.client_secret,
						code: code
					}, function (err, response) {
						if (response && response.ok) {
							Auth.login(response.body.access_token);
							$state.transitionTo('index');
						} else {
							console.log(err);
						}
					});
				};
				// Start Login
				var options = {
					client_id: '28a0090981526161e546',
					client_secret: '849e7f7df2dce958ef7c518e312b94b96c4982a0',
					scope: ['user:email', 'notifications', 'repo:status']
				};

				//Build the OAuth consent page URL
				var authWindow = new BrowserWindow({
					width: 800,
					height: 600,
					show: true,
					'web-preferences': {
						'node-integration': false
					}
				});

				var githubUrl = 'https://github.com/login/oauth/authorize?';
				var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scope;
				authWindow.loadUrl(authUrl);

				authWindow.webContents.on('will-navigate', function (event, url) {
					handleCallback(url);
				});

				authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
					handleCallback(newUrl);
				});

				function handleCallback (url) {
					var raw_code = /code=([^&]*)/.exec(url) || null;
					var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
					var error = /\?error=(.+)$/.exec(url);

					if (code || error) {
						// Close the browser if code found or error
						authWindow.destroy();
					}

					// If there is a code, proceed to get token from github
					if (code) {
						getGithubToken(options, code);
					} else if (error) {
						window.alert('Oops! Something went wrong and we couldn\'t log you in using Github. Please try again.');
					}
				}

				// If "Done" button is pressed, hide "Loading"
				authWindow.on('close', function () {
					authWindow.destroy();
				});
			}
		}
	});
};


