import { Class } from 'meteor/jagi:astronomy';
import { ContentTypes } from 'meteor/genroa:nb-ct-base';




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
			type: [ContentBlock],
			default: function() {return []}
		},
		desktopSize: {
			type: Number,
			default: function() {return 4}				
		},
		tabletSize: {
			type: Number,
			default: function() {return 4}				
		},
		mobileSize: {
			type: Number,
			default: function() {return 4}				
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