import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

// Import needed templates (layout and pages)
import App from '../../ui/layouts/App';
import Home from '../../ui/pages/Home';


FlowRouter.route('/', {
	name: 'Home',
	action() {
		mount(App, {
			main: (<Home />)
		});
	}
});


// not found template

FlowRouter.notFound = {
	action() {
		mount(App, {
			main: (<NotFound />)
		});
	}
};

const scrollTop = () =>{
	$(window).scrollTop(0)
}

FlowRouter.triggers.enter([scrollTop]);
