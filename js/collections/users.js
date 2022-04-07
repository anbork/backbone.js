var app = app || {};

(function () {
	'use strict';

	var users = Backbone.Collection.extend({
		model: app.user,
		localStorage: new Backbone.LocalStorage('users-backbone'),
	});

	app.users = new users();
})();
