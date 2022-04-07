var app = app || {};

(function ($) {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.userapp',
		statsTemplate: _.template($('#stats-template').html()),

		events: {
			'click .create-user': 'createUser'
		},

		initialize: function () {
			this.$name =	document.querySelector('.user-name')
			this.$phone = document.querySelector('.user-phone')
			this.$stats = document.querySelector('.stats')
			this.$table = document.querySelector('.users-table')
			this.$list = document.querySelector('.users-list')
			this.$validation = document.querySelector('.validation')

			this.listenTo(app.users, 'add', this.addOne);
			this.listenTo(app.users, 'reset', this.addAll);
			this.listenTo(app.users, 'all', _.debounce(this.render, 0));

			app.users.fetch({reset: true});
		},

		render: function () {
			var all = app.users.length;

			if (all) {
				this.$table.style.display = 'block';
			} else {
				this.$table.style.display = 'none';
			}

			this.$stats.innerHTML = this.statsTemplate({
				all: all,
				plural: all%10==1 && all%100!=11 ? 0 : all%10>=2 && all%10<=4 && (all%100<10 || all%100>=20) ? 1 : 2
			});

		},

		addOne: function (user) {
			var view = new app.userView({ model: user });
			this.$list.append(view.render().el);
		},

		addAll: function () {
			this.$list.innerHTML = '';
			app.users.each(this.addOne, this);
		},

		createUser: function (e) {
			var name = this.$name.value.trim()
			var phone = this.$phone.value.trim()
			var user = app.users.create({
				name: name,
				phone: phone
			});
			if (user.isValid()) {
				console.log('Тут должен быть метод создания на бэкенде');
				this.$name.value = '';
				this.$phone.value = '';
				this.$validation.innerHTML = ''
			} else {
				this.$validation.innerHTML = user.validationError
				user.destroy();
			}
		},
	});
})(jQuery);
