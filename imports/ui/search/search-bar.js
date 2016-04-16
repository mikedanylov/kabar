/**
 * Created by mikedanylov on 4/9/16.
 */

import { Template } from 'meteor/templating';

import { SongSearch } from './search-results';

import './search-bar.html';

Template.search.onRendered(() => {
    $('div.search-active').hide();
});

Template.search.events({
    'click span.search-icon-hover': () => {
        // show search div with input field when icon is clicked
        $('div.search-active').fadeIn();
        // and focus on input
        $('input.search-input').focus();
        // hide another seach icon, menu hamburger and nav-brand
        $('div.search-inactive').hide();
        $('a.navbar-brand').hide();
        $('div#search-results-wrapper').fadeIn();

    },
    'blur .search-input': () => {
        // unhide search div with icon
        $('div.search-inactive').fadeIn();
        // hide search input field
        $('div.search-active').hide();
        $('a.navbar-brand').fadeIn();
        $('div#search-results-wrapper').fadeOut();
    },
    "keyup .search-input": _.throttle((e) => {
        let text = $(e.target).val().trim();
        SongSearch.search(text);
    }, 400)
});
