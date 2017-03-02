import { Class } from 'meteor/jagi:astronomy';
import { ContentTypes, ContentCreationOptions } from 'meteor/genroa:nb-ct-base';
import { AdminPanels } from 'meteor/genroa:nb-admin';
import { Meteor } from 'meteor/meteor';
import { ServerSession } from "meteor/matteodem:server-session";

/*********************
  A content block is  a class linkin a block in a page layout to a Content. Used to retrieve the right
  content and render it.
*********************/
ContentBlock = Class.create({
	name: 'ContentBlock',
	fields: {
		content: {
			type: String
		}
	}
});

/*********************
  A content column is a class defining a column in a page layout It contains informations on its responsive
  display and the content blocks it contains.
*********************/
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

/*********************
  A content block is  a class representing a part of a page layout where you can add columns.
*********************/
ContentSection = Class.create({
	name: 'ContentSection',
	fields: {
		columns: {
			type: [ContentColumn]
		}
	}
});

/*********************
  A page layout is a class representing a page layout. Rework needed (to be usable with render targets)
*********************/
PageLayout = Class.create({
	name: 'PageLayout',
	fields: {
		sections: {
			type: [ContentSection]
		}
	}
});

/*********************
  A page is a class representing a page. It has a name, an id used for the url and links, and a page layout.
*********************/
Page = Class.create({
	name: 'Page',
	collection: new Mongo.Collection('pages'),
	fields: {
		layout: {
		  type: PageLayout
		},
		name: {
			type: String
		},
		id: {
			type: String
		}
	}
});

/*********************
  PageTemplates is an extensible collection : it is in fact containing the installed global templates (layouts). Template packages installed
  register themselves using the addTemplate method.
*********************/
PageTemplates = {
	_templates: {},
	addTemplate: function(template) {
		PageTemplates._templates[template.id] = template;
	}
};

/*********************
  RenderTargets is an extensible collection : it is in fact containing the installed render targets. When a new kind of content needs to be rendered in a part of the page, it is registered using the setTarget method. Then, if the global template defined for the website contains this render target, the registered content is rendered inside the right part of the template.
*********************/
RenderTargets = {
	_targets: {},
	setTarget: function(target) {
		RenderTargets._targets[target.target] = target;
	}
};



/*********************
  Registers the "page_content" render target to render the page_content_template Blaze template, if the global template has a "page_content" render target.
*********************/
RenderTargets.setTarget({
	target: "page_content",
	template: "page_content_template",
	getData: function(pageId, target) {
				let data = {
					pageData: Page.findOne({id: pageId}),
					section_dragula: dragula({
						moves: function(el, container, handle) {
							return !handle.classList.contains('content_column_handle')
							&& !handle.classList.contains('content_handle')
							&& handle.classList.contains('drag_handle');
						},
						
						isContainer: function(el) {
							return el.classList.contains('section_container');
						},
					}),

					column_dragula: dragula({
						moves: function(el, container, handle) {
							return !handle.classList.contains('content_handle')
									&& handle.classList.contains('drag_handle');
						},
						
						isContainer: function(el) {
							return el.classList.contains('column_container');
						}
					}),

					content_dragula: dragula({
						moves: function(el, container, handle) {
							return handle.classList.contains('drag_handle');
						},
						
						isContainer: function(el) {
							return el.classList.contains('content_container');
						}
					})
				};
				return data;
			}
});

/*********************
  WIP : define the global page template, and the default page used when no page id is given ("/" url).
*********************/
ServerSession.set("currentPageTemplate", "default_layout");
ServerSession.set("defaultPage", "index"); // according to fake_imports.js

import './methods.js';