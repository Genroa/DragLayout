import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main_page.html';



Template.main_page.helpers({
	getPageSections: function() {
		var page = Template.instance().data.pageData;
		return page && page.layout.sections;
	},

	getPage: function() {
		//console.log(Template.instance().data.pageData);
		return Template.instance().data.pageData;
	}
});


Template.main_page.onCreated(function(){
	Session.set("noRender", false);
	Session.set("cachedLayout", null);


	// Section move event
	this.data.section_dragula.on("drop", function(el, target, source, sibling) {
		let sections = target.children;
		let newIndexes = new Array(sections.length);
		
		// On note les nouvelles correspondances index <=> DOM
		for(let i=0; i<sections.length; i++) {
			newIndexes[i] = sections[i].dataset.index;
		}

		Session.set("cachedLayout", $(".section_container").clone().html());
		Session.set("noRender", true);

		if(this.data.pageData) {
			Meteor.call("update_sections", this.data.pageData._id, newIndexes, function(){
				Session.set("noRender", false);
				Session.set("cachedLayout", null);
			});
		}
	}.bind(this));

	// Column move event
	this.data.column_dragula.on("drop", function(el, target, source, sibling) {
		let oldSectionIndex = el.dataset.sectionIndex;
		let oldIndex = el.dataset.index;
		
		let newSectionIndex = target.parentElement.dataset.index;
		let newIndex = $(el).index();

			
		Session.set("cachedLayout", $(".section_container").clone().html());
		Session.set("noRender", true);

		Meteor.call("move_column", this.data.pageData._id, oldSectionIndex, oldIndex, newSectionIndex, newIndex, function(){
			Session.set("noRender", false);
			Session.set("cachedLayout", null);
		});
	}.bind(this));


	// Content block move event
	this.data.content_dragula.on("drop", function(el, target, source, sibling) {
		let oldSectionIndex = el.dataset.sectionIndex;
		let oldColumnIndex = el.dataset.columnIndex;
		let oldIndex = el.dataset.index;
		
		let newSectionIndex = target.parentElement.dataset.sectionIndex;
		let newColumnIndex = target.parentElement.dataset.index;
		let newIndex = $(el).index();
		
			
		Session.set("cachedLayout", $(".section_container").clone().html());
		Session.set("noRender", true);

		Meteor.call("move_block", this.data.pageData._id, 
									oldSectionIndex, 
									oldColumnIndex, 
									oldIndex, 
									newSectionIndex, 
									newColumnIndex,
									newIndex, 
			function(){
				Session.set("noRender", false);
				Session.set("cachedLayout", null);
		});


	}.bind(this));
});


Template.main_page.events({
	'click .add-content-section': function(evt) {
		evt.preventDefault();
		var instance = Template.instance();
		let page = instance.data.pageData;
		Meteor.call("create_section", page._id, function(){});
	}
});