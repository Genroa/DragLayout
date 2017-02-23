import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	import '../../api/layout/collections.js';
	import './fake_imports.js';
	
	Meteor.publish("pages", function() {
		return Page.find({});
	});
});
