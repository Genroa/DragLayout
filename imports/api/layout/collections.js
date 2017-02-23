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
			page.layout.sections.push(new ContentSection({columns: []}));
			page.save();
		}
	},

	'delete_section' : function(pageId, sectionIndex) {
		let page = Page.findOne({_id: pageId});
		if(page) {
			page.layout.sections.splice(sectionIndex, 1);
			page.save();
		}
	}
	
});