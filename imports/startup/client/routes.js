/**
 * Created by mikedanylov on 3/18/16.
 */

import {Meteor} from 'meteor/meteor';
import {Router} from  'meteor/iron:router';

import '/imports/ui/site/site.js';
import '/imports/ui/navigation/navigation.js';
import '/imports/ui/search/search-bar.js';
import '/imports/ui/songs/songs.js';
import '/imports/ui/songs/show/show.js';
import '/imports/ui/signup/signup.js';
import '/imports/ui/places/places.js';
import '/imports/ui/places/songs/songs.js'
import '/imports/ui/places/songs/add/add.js';
import '/imports/ui/places/songs/edit/edit.js';
import '/imports/ui/feedback/feedback.js';
import '/imports/ui/singleSongBlock/single-song-block.js';

import {Songs, Places, Orders, Comments, Lyrics} from  './collections.js';

Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});
Router.route('/', {
    name: 'home',
    template: 'home',
    data: function() {
        return Meteor.user();
    }
});
Router.route('/signup');
Router.route('/search');
Router.route('/signin');
Router.route('/places', {
    name: 'places',
    waitOn: function() {
        return Meteor.subscribe('places');
    }
});
Router.route('/places/add', {
    template: 'placeAdd'
});
Router.route('/places/:_id/songs', {
    name: 'placeSongs',
    template: 'placeSongs',
    data: function () {
        return {
            place: Places.findOne({_id: this.params._id}),
            songs: Songs.find({place: this.params.name}),
            currentUser: Meteor.user()
        };
    },
    waitOn: function () {
        return [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places')
        ];
    }
});
Router.route('/places/:_id/songs/add', {
    name: 'songAdd',
    template: 'songAdd',
    data: function () {
        return {
            place: Places.findOne({_id: this.params._id}),
            songs: Songs.find({place: this.params.name}),
            currentUser: Meteor.user()
        };
    },
    waitOn: function () {
        return [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places')
        ];
    }
});
Router.route('/places/:place_id/songs/:song_id/edit', {
    name: 'songEdit',
    template: 'songEdit',
    data: function () {
        return {
            place: Places.findOne({_id: this.params.place_id}),
            song: Songs.findOne({_id: this.params.song_id}),
            currentUser: Meteor.user()
        };
    },
    waitOn: function () {
        return [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places')
        ];
    }
});
Router.route('/places/:_id/karaoke', {
    name: 'placeKaraoke',
    template: 'placeKaraoke',
    data: function () {
        var place, currentOrder, nextOrder, ordersPlaylist, songs, currentUser;
        var id  = this.params._id;
        place = Places.findOne({_id: id});
        if (place) {
            currentOrder = Orders.findOne({place: place.name, status: 'processing'}, {sort: {priority: -1, createdAt: 1}});
            nextOrder = Orders.findOne({place: place.name, status: 'processing'}, {sort: {priority: -1, createdAt: 1}, skip: 1});
            ordersPlaylist = Orders.find({place: place.name, status: 'processing'}, {sort: {priority: -1, createdAt: 1}, skip: 2});
            songs = Songs.find({places: place.name});
        }
        currentUser = Meteor.user();
        return {
            currentOrder: currentOrder,
            nextOrder: nextOrder,
            user: currentUser,
            ordersPlaylist: ordersPlaylist,
            songs: songs,
            place: place
        };
    },
    waitOn: function () {
        return  [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places'),
            Meteor.subscribe('orders')
        ];
    }
});
Router.route('/songs', {
    template: 'songsList',
    name: 'songsList',
    loadingTemplate: 'loading',
    waitOn: function () {
        return  [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places')
        ];
    }
});
Router.route('/songs/:_id/show', {
    template: 'songShow',
    data: function () {
        var song, allPlaces, places = [], songLyrics;
        song = Songs.findOne({ _id: this.params._id});
        if (song && song.name) {
            songLyrics = Lyrics.findOne({song: song.name});
        }
        allPlaces = Places.find().fetch();
        allPlaces.forEach(function (place) {
            if (song.places.indexOf(place.name) !== -1) {
                places.push(place);
            }
        });
        return {
            song: song,
            places: places,
            songLyrics: songLyrics
        };
    },
    waitOn: function () {
        return  [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places'),
            Meteor.subscribe('lyrics')
        ];
    }
});
Router.route('/feedback', {
    template: 'feedback',
    data: function () {
        return Comments.find();
    },
    waitOn: function () {
        return Meteor.subscribe('comments');
    },
    onBeforeAction: function () {
       if (Meteor.user()) {
          this.next();
       } else if (Router.current().route.getName() === 'feedback') {
           Router.go('home');
       } else {
           Router.go('signup');
       }
    }
});
