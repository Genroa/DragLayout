
import { Meteor } from 'meteor/meteor';
import { Router, RouteController } from 'meteor/iron:router';

import '../../api/layout/collections.js';

Router.route('/', {
	name: "main_page",
	template: "main_page",
	subscriptions: function() {
		return Meteor.subscribe("pages");
	},

	data: function() {
		var data = {
			pageData: Page.findOne(),
			section_dragula: dragula({
				moves: function(el, container, handle) {
					return !handle.classList.contains('content_column_handle')
					&& !handle.classList.contains('content_handle')
					&& handle.classList.contains('drag_handle');
				},
				
				isContainer: function(el) {
					return el.classList.contains('section_container');
				},
			}),

			column_dragula: dragula({
				moves: function(el, container, handle) {
					return !handle.classList.contains('content_handle')
							&& handle.classList.contains('drag_handle');
				},
				
				isContainer: function(el) {
					return el.classList.contains('column_container');
				}
			}),

			content_dragula: dragula({
				moves: function(el, container, handle) {
					return handle.classList.contains('drag_handle');
				},
				
				isContainer: function(el) {
					return el.classList.contains('content_container');
				}
			})
		};
		return data;
	},
});