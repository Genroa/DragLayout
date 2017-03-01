

import './content_template_not_found.html';


Template.content_template_not_found.helpers({
	'getContentTypeHumanName' : function(content) {
		let contentType = content && ContentTypes._contentTypes[content.className];
		if(!contentType) {
			return "content";
		}
		return contentType;
	}
});