import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

// Import needed templates (layout and pages)
import App from '../../ui/layouts/App';
import Home from '../../ui/pages/Home';
import Menu from '../../ui/pages/Menu';
import Cart from '../../ui/pages/Cart';
import Builder from '../../ui/pages/Builder';


// FlowRouter.route('/', {
// 	name: 'Home',
// 	action() {
// 		mount(App, {
// 			main: (<Home />)
// 		});
// 	}
// });

FlowRouter.route('/', {
	name: 'Builder',
	action() {
		mount(App, {
			main: (<Builder />)
		});
	}
});

// FlowRouter.route('/menu', {
// 	name: 'Menu',
// 	action() {
// 		mount(App, {
// 			main: (<Menu />)
// 		});
// 	}
// });

// FlowRouter.route('/cart', {
// 	name: 'Cart',
// 	action() {
// 		mount(App, {
// 			main: (<Cart />)
// 		});
// 	}
// });

// FlowRouter.route('/builder', {
// 	name: 'Builder',
// 	action() {
// 		mount(App, {
// 			main: (<Builder />)
// 		});
// 	}
// });


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
