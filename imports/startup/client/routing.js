
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { ServerSession } from "meteor/matteodem:server-session";
import '../../api/layout/collections.js';



/*********************
  Defines the pages route. 
*********************/
Router.route("/:page_id", {
	name: "page",
	action : function() {
		this.layout(ServerSession.get("currentPageTemplate"));
		
		let regions = Object.keys(RenderTargets._targets);
		
		for(let i=0; i<regions.length; i++) {
			this.render(RenderTargets._targets[regions[i]].template, {to: regions[i], data: RenderTargets._targets[regions[i]].getData(this.params.page_id, RenderTargets._targets[regions[i]])});
		}
	},
	
	data: function(){
		let data = {
			currentPage: Page.findOne({id: this.params.page_id})
		};
		
		return data;
	}
});

/*********************
  Defines the default route (redirecting to the default page). 
*********************/
Router.route('/', {
	name: "default_page",
	onBeforeAction: function() {
		this.redirect("/"+ServerSession.get("defaultPage"));
	}
});