

import './content_block.html';


Template.content_block.helpers({
	"getContentTemplate" : function() {
		var block = Template.instance().data.block;
		
		var content = block && Content.findOne({_id: block.content});
		if(!content) return;
		
		content = getConvertedContent(content);
		let template = content.getTemplateName();
		
		return Blaze.Template[template] instanceof Blaze.Template ? template : "content_template_not_found";
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