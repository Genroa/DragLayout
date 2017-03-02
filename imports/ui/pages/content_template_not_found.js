

import './content_template_not_found.html';


Template.content_template_not_found.helpers({
	'getContentTypeHumanName' : function(content) {
		let cont = getConvertedContent(content);
		let contentType = cont && cont.getHumanName();
		if(!contentType) {
			return "content";
		}
		return contentType;
	}
});