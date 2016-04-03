/**
 * Created by mikedanylov on 3/18/16.
 */

import { Meteor } from 'meteor/meteor';

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
Router.route('/signin');
Router.route('/places', {
    name: 'places'
});
Router.route('/places/add', {
    template: 'placeAdd'
});
Router.route('/places/:_id/show', {
    template: 'placeShow',
    data: function () {
        return Places.findOne({ _id: this.params._id})
    }
});
Router.route('/places/:_id/edit', {
    name: 'placeEdit',
    template: 'placeEdit',
    data: function () {
        return Places.findOne({ _id: this.params._id})
    }
});
Router.route('/places/:_id/songs', {
    template: 'placeSongs',
    data: function () {
        return {
            songs: Songs.find({places: this.name}),
            place: Places.findOne({ _id: this.params._id})
        }
    },
    subscriptions: function() {
        return Songs.find();
    }
});
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
        var place = Places.findOne({ _id: this.params._id}),
            currentOrder = Orders.findOne({place: place.name}, {sort: {priority: -1}}),
            nextOrder = Orders.findOne({place: place.name}, {sort: {priority: -1}, skip: 1}),
            ordersPlaylist = Orders.find({place: place.name}, {sort: {priority: -1}, skip: 2}),
            songs = Songs.find({places: place.name}),
            currentUser = Meteor.user();
        return {
            currentOrder: currentOrder,
            nextOrder: nextOrder,
            user: currentUser,
            ordersPlaylist: ordersPlaylist,
            songs: songs,
            place: place
        }
    }
});
Router.route('/songs', {
    template: 'songs',
    name: 'songs',
    data: () => {
        return Songs.find();
    },
    subscriptions: () => {
        return Meteor.subscribe('songs');
    }
});
Router.route('/songs/add', {
    template: 'songAdd'
});
Router.route('/songs/:_id/show', {
    template: 'songShow',
    data: function () {
        var song = Songs.findOne({ _id: this.params._id});
        var places = song.places;
        console.log(song);
        console.log(places);
        return {
            song: song,
            places: places
        };
    },
    subscriptions: function() {

    }
});
Router.route('/songs/:_id/edit', {
    template: 'songEdit',
    data: function () {
        return Songs.findOne({ _id: this.params._id})
    }
});
