import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main_page.html';



Template.main_page.helpers({
	getPageSections: function() {
		var page = Template.instance().data.pageData;
		return page && page.layout.sections;
	},

	getPage: function() {
		return Template.instance().data.pageData;
	}
});


Template.main_page.onCreated(function() {
	var instance = Template.instance();
	/*instance.data.section_dragula = dragula([].slice.apply(document.querySelectorAll(".section_container")), {
		moves: function(el, container, handle) {
			return !handle.classList.contains('content_column_handle')
			&& !handle.classList.contains('content_handle')
			&& handle.classList.contains('drag_handle');
		}
	});*/
	
	Meteor.setTimeout(function() {
		this.column_dragula = dragula([].slice.apply(document.querySelectorAll(".column_container")), {
			moves: function(el, container, handle) {
				return !handle.classList.contains('content_handle')
						handle.classList.contains('drag_handle');
			}
		});
		console.log("done");
	}.bind(instance.data), 1000);

	Meteor.setTimeout(function() {
		this.content_dragula = dragula([].slice.apply(document.querySelectorAll(".content_container")), {
			moves: function(el, container, handle) {
				return handle.classList.contains('drag_handle');
			}
		});
		console.log("done");
		//console.log(this);
	}.bind(instance.data), 2000);
});

Template.main_page.onRendered(function(){
	var instance = Template.instance();
	/*instance.data.section_dragula = dragula([].slice.apply(document.querySelectorAll(".section_container")), {
		moves: function(el, container, handle) {
			return !handle.classList.contains('content_column_handle')
			&& !handle.classList.contains('content_handle')
			&& handle.classList.contains('drag_handle');
		}
	});*/
	
	Meteor.setTimeout(function() {
		this.column_dragula = dragula([].slice.apply(document.querySelectorAll(".column_container")), {
			moves: function(el, container, handle) {
				return !handle.classList.contains('content_handle')
						handle.classList.contains('drag_handle');
			}
		});
		console.log("done");
	}.bind(instance.data), 1000);

	Meteor.setTimeout(function() {
		this.content_dragula = dragula([].slice.apply(document.querySelectorAll(".content_container")), {
			moves: function(el, container, handle) {
				return handle.classList.contains('drag_handle');
			}
		});
		console.log("done");
		//console.log(this);
	}.bind(instance.data), 2000);
});


Template.main_page.events({
	'click .add-content-section': function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.pageData;
		Meteor.call("create_section", page._id, function(){

		});
	}
});