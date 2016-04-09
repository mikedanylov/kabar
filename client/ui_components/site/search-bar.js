/**
 * Created by mikedanylov on 4/9/16.
 */

import { Template } from 'meteor/templating';

Template.search.onRendered(() => {
    $('div.search-active').hide();
});

Template.search.events({
    'click span.search-icon-hover': (event) => {
        // show search div with input field when icon is clicked
        $('div.search-active').fadeIn();
        // and focus on input
        $('input.search-input').focus();
        // hide another seach icon, menu hamburger and nav-brand
        $('div.search-inactive').hide();
        $('a.navbar-brand').hide();

    },
    'blur .search-input': (event) => {
        // unhide search div with icon
        $('div.search-inactive').fadeIn();
        // hide search input field
        $('div.search-active').hide();
        $('a.navbar-brand').fadeIn();
    }
});