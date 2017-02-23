
import { Meteor } from 'meteor/meteor';
import { Router, RouteController } from 'meteor/iron:router';

import '../../api/layout/collections.js';

Router.route('/', {
	name: "main",
	template: "main_page",
	subscriptions: function() {
		return Meteor.subscribe("pages");
	},

	data: function() {
		return {
			pageData: Page.findOne(),
			section_dragula: dragula([].slice.apply(document.querySelectorAll(".section_container")), {
				moves: function(el, container, handle) {
					return !handle.classList.contains('content_column_handle')
					&& !handle.classList.contains('content_handle')
					&& handle.classList.contains('drag_handle');
				}
			}),

			column_dragula: dragula([].slice.apply(document.querySelectorAll(".column_container")), {
				moves: function(el, container, handle) {
					return !handle.classList.contains('content_handle')
							handle.classList.contains('drag_handle');
				}
			}),

			content_dragula: dragula([].slice.apply(document.querySelectorAll(".content_container")), {
				moves: function(el, container, handle) {
					return handle.classList.contains('drag_handle');
				}
			})
		}
	}
});