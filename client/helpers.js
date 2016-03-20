/**
 * Created by mikedanylov on 3/20/16.
 */

Template.registerHelper('isAdmin', function(adminsList) {
    return true ? (Meteor.user() && adminsList.indexOf(Meteor.user().username) >= 0) : false;
});

Template.registerHelper('isKabarAdmin', function() {
    return true ? (Meteor.user() && Meteor.user().username === 'kabaradmin') : false;
});

Template.registerHelper('songs', function() {
    console.log(this);
    return Songs.find({places: this.place.name});
});

Template.registerHelper('addOneTo', function(index) {
    return index + 1;
});

Template.placesList.helpers({
    places: function() {
        return Places.find();
    }
});

Template.placeSongs.helpers({
    songs: function() {
        return Songs.find({places: this.place.name});
    }
});

Template.placeKaraoke.helpers({
    orders: function () {
        console.log('data: ');
        console.log(this);
        return this.orders;
    }
});

Template.songsList.helpers({
    songs: function() {
        return Songs.find();
    }
});

Template.songShow.helpers({
    place: function(songName) {
        var currentSong = Songs.findOne({name: songName});
        return currentSong.places;
    },
    placeId: function(place) {
        var currPlace = Places.findOne({name: place});
        return currPlace._id;
    }
});