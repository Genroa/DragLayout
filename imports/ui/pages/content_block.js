

import './content_block.html';


getSafeTemplateName = function(content) {
	if(!content) return;

	var name = content.getTemplateName();
	if(Blaze.Template[name] instanceof Blaze.Template) {
		return name;
	}

	return "content_template_not_found";
}

Template.content_block.helpers({
	"getContentTemplate" : function() {
		var block = Template.instance().data.block;
		
		var content = block && TextContent.findOne({_id: block.content});

		if(content && !window[content.className]) {
			return "content_template_not_found";
		}

		content = block && window[content.className].findOne({_id: block.content});

		return content && getSafeTemplateName(content);
	},

	'getContentContext' : function() {
		var block = Template.instance().data.block;
		if(!block) {
			return;
		} 

		return {content: TextContent.findOne({_id: block.content}) };
	}
});


Template.content_block.events({
	'click .delete_content_block' : function(evt) {
		var data = Template.instance().data;
		Meteor.call("delete_content_block", data.page._id, 
											data.sectionIndex, 
											data.columnIndex,
											data.index, 
											function(){});
	}
});