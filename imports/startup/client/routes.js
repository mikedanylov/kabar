/**
 * Created by mikedanylov on 3/18/16.
 */

import {Meteor} from 'meteor/meteor';
import {Router} from  'meteor/iron:router';

import '/imports/ui/site/site.js';
import  '/imports/ui/navigation/navigation.js';
import  '/imports/ui/search/search-bar.js';
import  '/imports/ui/songs/songs.js';
import  '/imports/ui/signup/signup.js';
import  '/imports/ui/places/places.js';
import  '/imports/ui/feedback/feedback.js'

import {Songs, Places, Orders, Comments} from  './collections.js';

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
Router.route('/places/:_id/show', {
    template: 'placeShow',
    data: function () {
        return Places.findOne({ _id: this.params._id});
    }
});
Router.route('/places/:_id/edit', {
    name: 'placeEdit',
    template: 'placeEdit',
    data: function () {
        return Places.findOne({ _id: this.params._id});
    }
});
// Router.route('/places/:_id/songs', {
//     template: 'placeSongs',
//     data: function () {
//         return {
//             songs: Songs.find({places: this.name}),
//             place: Places.findOne({ _id: this.params._id})
//         }
//     },
//     subscriptions: function() {
//         Meteor.subscribe('songs');
//     }
// });
Router.route('/places/:_id/karaoke', {
    name: 'placeKaraoke',
    template: 'placeKaraoke',
    // redirect user to signup if he tries to access karaoke
    // without signing in
    //onBeforeAction: function() {
    //    if (Meteor.user()) {
    //       this.next();
    //    } else {
    //        Router.go('signup');
    //    }
    //},
    data: function () {
        var place, currentOrder, nextOrder, ordersPlaylist, songs, currentUser;
        var id  = this.params._id;
        place = Places.findOne({_id: id});
        if (place) {
            currentOrder = Orders.findOne({place: place.name}, {sort: {priority: -1}});
            nextOrder = Orders.findOne({place: place.name}, {sort: {priority: -1}, skip: 1});
            ordersPlaylist = Orders.find({place: place.name}, {sort: {priority: -1}, skip: 2});
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
Router.route('/songs/add', {
    template: 'songAdd'
});
Router.route('/songs/:_id/show', {
    template: 'songShow',
    data: function () {
        var song, allPlaces, places = [];
        song = Songs.findOne({ _id: this.params._id});
        allPlaces = Places.find().fetch();
        allPlaces.forEach(function (place) {
            if (song.places.indexOf(place.name) !== -1) {
                places.push(place);
            }
        });
        return {
            song: song,
            places: places
        };
    },
    waitOn: function () {
        return  [
            Meteor.subscribe('songs'),
            Meteor.subscribe('places')
        ];
    }
});
Router.route('/songs/:_id/edit', {
    template: 'songEdit',
    data: function () {
        return Songs.findOne({ _id: this.params._id})
    }
});
Router.route('/feedback', {
    template: 'feedback',
    data: function () {
        return Comments.find();
    },
    waitOn: function () {
        return Meteor.subscribe('comments');
    }
});
