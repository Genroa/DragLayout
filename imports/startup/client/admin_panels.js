import {AdminPanels} from "meteor/genroa:nb-admin";


/*********************
  Adds an administration panel to manage pages
*********************/
AdminPanels.addPanel({
	id:"pages",
	name: "Pages",
	template: "pages_management_template"
});

/*********************
  Adds an administration panel to manage global template choice and style
*********************/
AdminPanels.addPanel({
	id:"style",
	name: "Customisation du style",
	template: ""
});