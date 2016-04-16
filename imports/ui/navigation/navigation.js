import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Router } from  'meteor/iron:router';

import { changeHamburger } from '/imports/startup/client/globals';

import '/imports/ui/navigation/navbar-links.html';
import '/imports/ui/navigation/navigation.html';

import '/imports/ui/navigation/navbar.css';

Template.navigation.events({
    'click #nav-toggle': function(event) {
        var hamburger = $('#nav-toggle');
        setTimeout(changeHamburger, 50);

    }
});

Template.navbarLinks.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        var currentRoute = Router.current().route.getName();
        if (currentRoute === 'placeKaraoke' || currentRoute === 'placeEdit') {
            Router.go('home');
        } else {
            Router.go(currentRoute);
        }
    },
    'click .nav-link': function (event) {
        $('#menu').collapse('hide');
        setTimeout(changeHamburger,50);
    }
});

