import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';



ContentBlock = Class.create({
	name: 'ContentBlock',
	fields: {
		content: {
			type: String
		}
	}
});

ContentColumn = Class.create({
	name: 'ContentColumn',
	fields: {
		blocks: {
			type: [ContentBlock]
		}
	}
});


ContentSection = Class.create({
	name: 'ContentSection',
	fields: {
		columns: {
			type: [ContentColumn]
		}
	}
});


PageLayout = Class.create({
	name: 'PageLayout',
	fields: {
		sections: {
			type: [ContentSection]
		}
	}
});

Page = Class.create({
	name: 'Page',
	collection: new Mongo.Collection('pages'),
	fields: {
		layout: {
		  type: PageLayout
		}
	}
});


Meteor.methods({
	'create_section' : function(pageId) {
		let page = Page.findOne({_id: pageId});
		if(page) {
		
			let block = new ContentBlock({content: "Bloc de contenu"});
			let column1 = new ContentColumn({blocks: []});
			let column2 = new ContentColumn({blocks: [block]});
			page.layout.sections.push(new ContentSection({columns: [column1, column2]}));
			page.save();
		}
	},

	'delete_section' : function(pageId, sectionIndex) {
		let page = Page.findOne({_id: pageId});
		if(page) {
			page.layout.sections.splice(sectionIndex, 1);
			page.save();
		}
	},
	
	'delete_column' : function(pageId, sectionIndex, columnIndex) {
		let page = Page.findOne({_id: pageId});
		
		if(page) {
			let section = page.layout.sections[sectionIndex];
			section.columns.splice(columnIndex, 1);
			page.save();
		}
	},
	
	"update_sections" : function(pageId, newIndexes) {
		let page = Page.findOne({_id: pageId});
		
		if(page) {
			//console.log(newIndexes);
			let newSections = new Array(page.layout.sections.length);
			//console.log(page.layout.sections);
			
			
			// On réassigne correctement les bouts de l'objet
			for(let i=0; i<newSections.length; i++) {
				newSections[i] = page.layout.sections[newIndexes[i]];
			}
			
			//console.log(newSections);
			
			// Assign new order
			page.layout.sections = newSections;
			page.save();
		}
	}
	
});