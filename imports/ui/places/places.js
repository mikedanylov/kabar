/**
 * Created by mikedanylov on 4/3/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Places, Songs, Orders } from '/imports/startup/client/collections.js';

import './places.html';
import  './places.css';
import './add.html';
import './edit.html';
import './karaoke.html';
import './show.html';
import './placeSongs/songs.html';

Template.placesList.helpers({
    places: function () {
        return Places.find();
    }
});

Template.placeSongs.helpers({
    songs: function () {
        return Songs.find({places: this.place.name});
    }
});

Template.placeKaraoke.events({
    'click button#play-next': function (event) {
        var currentOrder = Template.instance().data.currentOrder;
        if (currentOrder) {
            Meteor.call('orders.updateStatus', currentOrder._id, 'completed', (err, res) => {
                if (err && err.length) {
                    console.log('Template::placeKaraoke::events: ' + err);
                } else {
                    console.log('Template::placeKaraoke::events: ' + res);
                }
            });
        }
    }
});

Template.placeKaraoke.helpers({
    printAll: function () {
        console.log('Template::placeKaraoke::helpers::printAll: ');
        console.log(this);
    },
    songs: function () {
        return Songs.find({places: this.name});
    },
    orders: function () {
        return this.orders;
    },
    getSongName: (songName) => {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongName: ' + currentSong.name);
        return currentSong.name;
    },
    getSongArtist: (songName) => {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongArtist: ' + currentSong.artist);
        return currentSong.artist;
    },
    getSongDuration: (songName) => {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongDuration: ' + currentSong.duration);
        return currentSong.duration;
    },
    getSongId: (songName) => {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongId: ' + currentSong._id);
        return currentSong._id;
    }
});

Template.placeAdd.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Places.insert({
            name: document.querySelector('[name=name]').value,
            address: document.querySelector('[name=address]').value,
            latitude: document.querySelector('[name=latitude]').value,
            longitude: document.querySelector('[name=longitude]').value
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('places');
        });
    }
});

Template.placeEdit.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Places.update(this._id, {
            $set: {
                name: document.querySelector('[name=name]').value,
                address: document.querySelector('[name=address]').value,
                latitude: document.querySelector('[name=latitude]').value,
                longitude: document.querySelector('[name=longitude]').value
            }
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('places');
        });
    }
});

Template.places.events({
    'click .remove': function(event) {
        var answer = confirm("Are you 100% sure you want to remove your karaoke place?");
        if (answer) {
            Places.remove(this._id);
        }
    }
});

Template.placesList.onRendered(function () {
    $(".places-link").addClass("active");
});
Template.placesList.onDestroyed(function () {
    $(".places-link").removeClass("active");
});
Template.placeKaraoke.onRendered(function () {
    $(".places-link").addClass("active");
    $("a.navbar-brand").text(this.data.place.name);
});
Template.placeKaraoke.onDestroyed(function () {
    $(".places-link").removeClass("active");
    $("a.navbar-brand").text("kabar");
});

