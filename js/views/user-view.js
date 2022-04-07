var app = app || {};

(function ($) {
	'use strict';

	app.userView = Backbone.View.extend({
		tagName:  'tr',
		template: _.template($('#item-template').html()),

		events: {
			'click .edit-btn': 'edit',
			'click .destroy': 'destroy',
			'click .save-btn': 'save'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			if (this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));
			this.$editBtn = this.$('.edit-btn');
			this.$saveBtn = this.$('.save-btn');
			this.$name = this.$('.edit-name');
			this.$phone = this.$('.edit-phone');
			this.$validation = document.querySelector('.validation')
			return this;
		},

		edit: function () {
			this.$('.text').hide();
			this.$name.show();
			this.$phone.show();
			this.$editBtn.hide();
			this.$saveBtn.show();
		},

		save: function (e) {
			var name = this.$name.val().trim();
			var phone = this.$phone.val().trim();
			this.model.save({ 
				name: name,
				phone: phone
			});
			if (this.model.validationError) {
				this.$validation.innerHTML = this.model.validationError
			} else {
				console.log('Тут должен быть метод сохранения на бэкенде');
				this.$validation.innerHTML = ''
				this.$('.text').show();
				this.$name.hide();
				this.$phone.hide();
				this.$editBtn.show();
				this.$saveBtn.hide();
			}
		},

		destroy: function () {
			console.log('Тут должен быть метод удаления на бэкенде');
			this.$validation.innerHTML = ''
			this.model.destroy();
		}
	});
})(jQuery);
