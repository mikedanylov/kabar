/**
 * Created by mikedanylov on 5/10/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places, Lyrics } from '/imports/startup/client/collections.js';

import  './home.html';

Template.home.helpers({
    username: function () {
        return getUserName(Meteor.user());
    },
    popularPlaces: function () {
        return Places.find({}, {sort: {popularity: 1}, limit: 3});
    }
});

Template.home.events({
});

Template.home.onRendered(() => {
    $(".home-link").addClass("active");
    $("a.navbar-brand").text('home');
    $('#pop-places-list').slick({
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });
});
Template.home.onDestroyed(() => {
    $(".home-link").removeClass("active");
});