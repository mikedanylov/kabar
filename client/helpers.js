/**
 * Created by mikedanylov on 3/20/16.
 */

Template.registerHelper('isAdmin', function(adminsList) {
    return true ? (Meteor.user() && adminsList.indexOf(Meteor.user().username) >= 0) : false;
});

Template.registerHelper('isKabarAdmin', function() {
    return true ? (Meteor.user() && Meteor.user().username === 'kabaradmin') : false;
});

Template.placesList.helpers({
    place: function() {
        return Places.find();
    }
});

Template.placeSongs.helpers({
    songs: function() {
        return Songs.find();
    },
    admins: function () {

    }
});

Template.songsList.helpers({
    song: function() {
        return Songs.find();
    }
});

Template.songShow.helpers({
    place: function(name) {
        var currentSong = Songs.findOne({name: name});
        return currentSong.places;
    },
    placeId: function(place) {
        var currPlace = Places.findOne({name: place});
        return currPlace._id;
    }
});