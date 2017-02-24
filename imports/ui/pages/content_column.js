

import './content_column.html';


Template.content_column.helpers({
	buildColumnCSS: function(column) {
		return "";
	}
});


Template.content_column.events({
	'click .delete_column' : function(evt) {
		evt.preventDefault();
		var data = Template.instance().data;
		Meteor.call("delete_column", data.page._id, data.sectionIndex, data.index, function(){});
	},

	'click .add-content-block' : function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.page;
		let sectionIndex = evt.target.dataset.sectionIndex;
		let columnIndex = evt.target.dataset.index;
		Meteor.call("create_content_block", page._id, sectionIndex, columnIndex, function(){});
	}
});