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
        return Places.find({}, {sort: {popularity: 1}, limit: 5});
    },
    popularSongs: function () {
        return Songs.find({}, {sort: {popularity: 1}, limit: 10});
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
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('#pop-songs-list').slick({
        infinite: true,
        dots: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
});
Template.home.onDestroyed(() => {
    $(".home-link").removeClass("active");
});