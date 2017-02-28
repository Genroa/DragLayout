import { Class } from 'meteor/jagi:astronomy';



Content = Class.create({
	name: 'Content',
	
	collection: new Mongo.Collection('contents'),
	
	fields: {
		showInContentManagement: Boolean,
	},

	helpers: {
		getTemplateName : function(obj) {
			return "";
		}
	}
});


TextContent = Content.inherit({
	name: "TextContent",
	
	fields: {
		text: String
	},

	helpers: {
		getTemplateName : function(obj) {
			return "";
		}
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