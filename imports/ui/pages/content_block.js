

import './content_block.html';



Template.content_block.events({
	'click .delete_content_block' : function(evt) {
		var data = Template.instance().data;
		console.log("call");
		Meteor.call("delete_content_block", data.page._id, 
											data.sectionIndex, 
											data.columnIndex,
											data.index, 
											function(){});
	}
});