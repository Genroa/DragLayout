

import './content_column.html';


Template.content_column.helpers({
	buildColumnCSS: function() {
		let data = Template.instance().data;
		let sectionIndex = data.sectionIndex;
		let column = data.page.layout.sections[sectionIndex].columns[data.index];

		return "mdl-cell--"+ column.desktopSize+"-col-desktop "+
			   "mdl-cell--"+ column.tabletSize+"-col-tablet "+
			   "mdl-cell--"+ column.mobileSize+"-col-phone";
	},

	isSelectedDesktopSize: function(size) {
		let data = Template.instance().data;
		let sectionIndex = data.sectionIndex;
		let column = data.page.layout.sections[sectionIndex].columns[data.index];

		return (column && column.desktopSize == size) ? "selected" : "";
	},

	isSelectedTabletSize: function(size) {
		let data = Template.instance().data;
		let sectionIndex = data.sectionIndex;
		let column = data.page.layout.sections[sectionIndex].columns[data.index];

		return (column && column.tabletSize == size) ? "selected" : "";
	},

	isSelectedMobileSize: function(size) {
		let data = Template.instance().data;
		let sectionIndex = data.sectionIndex;
		let column = data.page.layout.sections[sectionIndex].columns[data.index];

		return (column && column.mobileSize == size) ? "selected" : "";
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
	},

	'change .change_column_size_desktop' : function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.page;
		let sectionIndex = instance.data.sectionIndex;
		let columnIndex = instance.data.index;
		Meteor.call("change_column_size_desktop", page._id, sectionIndex, columnIndex, parseInt(evt.target.value), function(){});
	},

	'change .change_column_size_tablet' : function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.page;
		let sectionIndex = instance.data.sectionIndex;
		let columnIndex = instance.data.index;
		Meteor.call("change_column_size_tablet", page._id, sectionIndex, columnIndex, parseInt(evt.target.value), function(){});
	},

	'change .change_column_size_mobile' : function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.page;
		let sectionIndex = instance.data.sectionIndex;
		let columnIndex = instance.data.index;
		Meteor.call("change_column_size_mobile", page._id, sectionIndex, columnIndex, parseInt(evt.target.value), function(){});
	}
});