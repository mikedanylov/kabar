/**
 * Created by mikedanylov on 4/3/16.
 */

import { getUserName } from '../../globals';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'

Template.placesList.helpers({
    places: () => {
        return Places.find();
    }
});

Template.placeSongs.helpers({
    songs: () => {
        return Songs.find({places: this.place.name});
    }
});

Template.placeKaraoke.helpers({
    printAll: () => {
        console.log('Template::placeKaraoke::helpers::printAll: ');
        console.log(this);
    },
    songs: () => {
        return this.songs;
    },
    orders: () => {
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

Template.placesList.onRendered(() => {
    $(".places-link").addClass("active");
});
Template.placesList.onDestroyed(() => {
    $(".places-link").removeClass("active");
});