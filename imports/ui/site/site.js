import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { getUserName, changeHamburger } from '/imports/startup/client/globals';

import '/imports/ui/site/main.html';
import '/imports/ui/site/home.html';
import '/imports/ui/site/loading.html';

import '/imports/ui/site/site.css';
import '/imports/ui/site/table.css';

Template.home.helpers({
    username: () =>  {
        return getUserName(Meteor.user());
    }
});

Template.main.events({
    'click #noNav': function (event) {
        if (window.innerWidth < 768) {
            $('#menu').collapse('hide');
            setTimeout(changeHamburger, 50);
        }

    }
});

Template.home.onRendered(() => {
    $(".home-link").addClass("active");
});
Template.home.onDestroyed(() => {
    $(".home-link").removeClass("active");
});
