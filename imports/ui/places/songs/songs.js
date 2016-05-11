/**
 * Created by mikedanylov on 5/1/16.
 */

import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Places, Songs, Orders } from '/imports/startup/client/collections.js';
import { getUserName } from '/imports/startup/client/globals';

import './songs.html';

Template.placeSongs.helpers({
    getPlaceId: function () {
        var currentSong = this;
        return Template.instance().data.place._id;
    }
});

Template.placeSongs.events({
    'click .book-song': function bookSong(event) {
        var song = this;
        var place = Template.instance().data.place;
        var currentUser = getUserName(Meteor.user());

        Meteor.call('orders.placeOrder', song.name, place.name, currentUser,
        (err, res) => {
            if (err && err.length) {
                console.log('Template::songsList::events::bookSong ' + err);
            } else {
                console.log('Template::songsList::events::bookSong ' + res);
                Router.go('placeKaraoke', {_id: place._id});
            }
        });
    },
    'click .btn-remove-song': function removeSong(event) {
        var song = this;
        var place = Template.instance().data.place;

        Meteor.call('songs.removePlace', song._id, place.name, (err, res) => {
            if (err && err.length) {
                console.log('Template::songsList::events::removeSong: ' + err);
            } else {
                console.log('Template::songsList::events::removeSong ' + res);
            }
            Router.go('placeSongs', {_id: place._id});
        });

        // Songs.update({ _id: song._id }, {
        //     $pull: {
        //         places: place.name
        //     },
        //     $set: {
        //         updatedAt: new Date()
        //     }
        // });
    }
});

Template.placeSongs.onRendered(function () {
    $(".places-link").addClass("active");
    $("a.navbar-brand").text(Template.instance().data.place.name + ' songs');
});
Template.placeSongs.onDestroyed(function () {
    $(".places-link").removeClass("active");
    $("a.navbar-brand").text("kabar");
});
