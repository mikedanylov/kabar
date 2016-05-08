/**
 * Created by mikedanylov on 5/1/16.
 */

import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Places, Songs, Orders } from '/imports/startup/client/collections.js';
import { getUserName } from '/imports/startup/client/globals';

import './songs.html';

Template.placeSongs.helpers({
    data: function () {
        console.log(this);
    }
});

Template.songActionsDropdown.events({
    'click .book-song': function(event) {
        var song, place, currentUser, url, placeId;
        song = this;

        url = window.location.href;
        placeId = url.match(/places\/(.+)\/songs/);
        place = Places.findOne({_id: placeId[1]});
        currentUser = getUserName(Meteor.user());
        Meteor.call('orders.placeOrder', song.name, place.name, currentUser,
        (err, res) => {
            if (err && err.length) {
                console.log('Template::songsList::events: ' + err);
            } else {
                console.log('Template::songsList::events: ' + res);
                Router.go('placeKaraoke', {_id: place._id});
            }
        });
    }
});

Template.songActionsDropdown.helpers({
    isAdmin: function () {
        var url, placeId, place;

        url = window.location.href;
        placeId = url.match(/places\/(.+)\/songs/)[1];
        place = Places.findOne({_id: placeId});

        return !!(Meteor.user() && place.admin.indexOf(getUserName(Meteor.user())) >= 0);
    }
});

Template.placeSongs.onRendered(function () {
    $(".places-link").addClass("active");
    $("a.navbar-brand").text(this.data.place.name);
});
Template.placeSongs.onDestroyed(function () {
    $(".places-link").removeClass("active");
    $("a.navbar-brand").text("kabar");
});
