

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
	}
});