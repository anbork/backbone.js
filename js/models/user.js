var app = app || {};

(function () {
	'use strict';

	app.user = Backbone.Model.extend({
		defaults: {
			name: '',
			phone: ''
		},

		validate: function(attrs) {
			if (!attrs.name || attrs.name.length < 1) {
				return 'Имя не должно быть пусто'
			}
			if (!attrs.phone || attrs.phone.length < 1) {
				return 'Телефон не должен быть пустой'
			}
			if (!/^\+?[\d-]+$/.test(attrs.phone)) {
				return 'Телефон должен иметь корректный формат'
			}
			
		},
	});
})();
