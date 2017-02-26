import { Template } from 'meteor/templating';

Template.registerHelper("setTitle", function(title){
	if(title){
		document.title = title;
	}
	else{
		console.log("setTitle called without title!");
	}
});

Template.registerHelper("noRender", function(){
	return Session.get("noRender");
});

Template.registerHelper("cachedLayout", function(){
	return Session.get("cachedLayout");
});

Template.registerHelper("isAdmin", function(){
	return Session.get("isAdmin");
});

Template.registerHelper("buildAdminCSS", function(){
	return Session.get("isAdmin") ? "editing" : "";
});