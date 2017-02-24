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
		let columns = target.children;
		console.log("moved column:");
		console.log(source.parentElement);
		console.log(target.parentElement);

		// Now, build a plan of what changed to explain it to the server
		// Give new indexes position and array length
		if(source == target) {
			let newIndexes = new Array(columns.length);
			let sectionIndex = el.dataset.sectionIndex;

			// On note les nouvelles correspondances index <=> DOM
			for(let i=0; i<columns.length; i++) {
				newIndexes[i] = columns[i].dataset.index;
			}

			Session.set("cachedLayout", $(".section_container").clone().html());
			Session.set("noRender", true);

			Meteor.call("update_columns", this.data.pageData._id, sectionIndex, newIndexes, function(){
				Session.set("noRender", false);
				Session.set("cachedLayout", null);
			});
		}
		// Changement de conteneur : on va devoir retirer quelque chose coté source et ajout coté target
		else {
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
		}


	}.bind(this));
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