import { Class } from 'meteor/jagi:astronomy';



Content = Class.create({
	name: 'Content',
	collection: new Mongo.Collection('contents'),
	fields: {

	}
});

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

import './methods.js';