

import './content_section.html';

Template.content_section.helpers({
	
});



Template.content_section.events({
	'click .delete_section' : function(evt) {
		evt.preventDefault();
		var data = Template.instance().data;
		Meteor.call("delete_section", data.page._id, data.index, function(){});
	},

	'click .add-content-column' : function(evt) {
		evt.preventDefault();
		var data = Template.instance().data;
		Meteor.call("create_content_column", data.page._id, data.index, function(){});
	}
});



Template.content_section.onRendered(function() {
	//var data = Template.parentData(1);
});