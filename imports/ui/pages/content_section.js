

import './content_section.html';

Template.content_section.helpers({
	buildColumnCSS: function(column) {
		return "";
	}
});



Template.content_section.events({
	'click .delete_section' : function(evt) {
		evt.preventDefault();
		var data = Template.instance().data;
		Meteor.call("delete_section", data.page._id, data.index, function(){});
	}
});



Template.content_section.onRendered(function() {
	var data = Template.parentData(1);
	console.log(Template.instance().view.firstNode());
	//data.section_dragula.containers.push(Template.instance().view.firstNode().parentNode);
	data.section_dragula.containers.push(Template.instance().view.firstNode().parentNode);
});