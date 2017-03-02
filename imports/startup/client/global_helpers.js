import { Template } from 'meteor/templating';

/*********************
  sets the page title
*********************/
Template.registerHelper("setTitle", function(title){
	if(title){
		document.title = title;
	}
});

/*********************
  Session getter helper.
*********************/
Template.registerHelper("noRender", function(){
	return Session.get("noRender");
});

/*********************
  Session getter helper.
*********************/
Template.registerHelper("cachedLayout", function(){
	return Session.get("cachedLayout");
});

/*********************
  Session getter helper.
*********************/
Template.registerHelper("isAdmin", function(){
	return Session.get("isAdmin");
});

/*********************
  Session getter helper.
*********************/
Template.registerHelper("buildAdminCSS", function(){
	return Session.get("isAdmin") ? "editing" : "";
});

/*********************
  Returns the pages list
*********************/
Template.registerHelper('getPages', function() {
	return Page.find({});
});