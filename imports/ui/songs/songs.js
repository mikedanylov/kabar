import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places } from '/imports/startup/client/collections.js';
import './songs.html';
import  './show/show.html';

Template.songsList.events({
    'click .remove': function(event) {
        Songs.remove(this._id);
    },
    'click .place-order': function(event) {
        var song, place, currentUser;
        song = this;
        place = Places.findOne({_id: event.target.id});
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
    },
    'click button.drop-down': function (event) {
        let songName, songPlacesLists, currentElem, chevronDown, chevronUp;
        songName = this.name;
        // use quotation marks around songName because it can contain spaces
        currentElem = $(".song-places-wrapper[data-song-name=\"" + this.name + "\"]");
        chevronDown = $(".song-tile[data-song-name=\"" + this.name + "\"] .fa-angle-down");
        chevronUp = $(".song-tile[data-song-name=\"" + this.name + "\"] .fa-angle-up");
        songPlacesLists = $(".song-places-wrapper");
        songPlacesLists.slideUp('fast');
        if (currentElem.hasClass('active')) {
            songPlacesLists.removeClass('active');
            $('.fa-angle-up').hide();
            $('.fa-angle-down').show();
        } else {
            songPlacesLists.removeClass('active');
            currentElem.addClass('active');
            $('.fa-angle-up').hide();
            $('.fa-angle-down').show();
            chevronDown.hide();
            chevronUp.show();
            currentElem.slideDown();
        }
    }
});

Template.songsList.helpers({
    songs: function () {
        return Songs.find();
    },
    getPlaceId: function (placeName) {
        let placeObj = Places.findOne({name: placeName});
        return placeObj._id;
    }
});

Template.songsList.onRendered(() => {
    $(".songs-link").addClass("active");
});
Template.songsList.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});
