/*
 * Service: Auth
 */

module.exports = function(app, window) {
	return app.factory('Auth', function ($window) {
		return {
			login: function(access_token) {
				var sharon = {
					access_token: access_token
				};
				$window.localStorage.sharonAuth = JSON.stringify(sharon);
				return true;
			},
			logged: function() {
				var userData = JSON.parse($window.localStorage.sharonAuth || '{}');
				if (userData.hasOwnProperty('access_token') && userData.access_token.length > 1) {
					return true;
				} else {
					return false;
				}
			},
			getAccessToken: function() {
				var userData = JSON.parse($window.localStorage.sharonAuth || '{}');
				if (userData.hasOwnProperty('access_token') && userData.access_token.length > 1) {
					return userData.access_token;
				} else {
					return null;
				}
			},
			logout: function() {
				delete $window.localStorage.sharonAuth;
				return true;
			}		
		}
	});
};

