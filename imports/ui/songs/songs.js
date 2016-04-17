import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places } from '/imports/startup/client/collections.js';
import './songs.html';
import './add.html';
import  './show.html';
import  './edit.html';

Template.songsList.events({
    'click .remove': function(event) {
        Songs.remove(this._id);
    },
    'click .place-order': function(event) {
        var song, place, currentUser;
        song = this;
        place = Places.findOne({name: event.target.innerHTML});
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
    'click button.btn': function (event) {
        let songName, songPlacesLists, currentElem, chevronDown, chevronUp;
        songName = this.name;
        // use quotation marks around songName because it can contain spaces
        currentElem = $(".song-places-wrapper[data-song-name='" + this.name + "']");
        chevronDown = $(".song-tile[data-song-name='" + this.name + "'] .fa-chevron-down");
        chevronUp = $(".song-tile[data-song-name='" + this.name + "'] .fa-chevron-up");
        songPlacesLists = $(".song-places-wrapper");
        songPlacesLists.slideUp('fast');
        if (currentElem.hasClass('active')) {
            songPlacesLists.removeClass('active');
            $('.fa-chevron-up').hide();
            $('.fa-chevron-down').show();
        } else {
            songPlacesLists.removeClass('active');
            currentElem.addClass('active');
            $('.fa-chevron-up').hide();
            $('.fa-chevron-down').show();
            chevronDown.hide();
            chevronUp.show();
            currentElem.slideDown();
        }
    }
});

Template.songsList.helpers({
        songs: () => {
        return Songs.find();
}
});

Template.songAdd.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Songs.insert({
            name: document.querySelector('[name=name]').value,
            artist: document.querySelector('[name=artist]').value,
            duration: document.querySelector('[name=duration]').value
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('songs');
        });
    }
});

Template.songEdit.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Songs.update(this._id, {
            $set: {
                name: document.querySelector('[name=name]').value,
                artist: document.querySelector('[name=artist]').value,
                duration: document.querySelector('[name=duration]').value
            }
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('songs');
        });
    }
});

Template.songsList.onRendered(() => {
    $(".songs-link").addClass("active");
});
Template.songsList.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});
Template.songShow.onRendered(() => {
    $(".songs-link").addClass("active");
});
Template.songShow.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});