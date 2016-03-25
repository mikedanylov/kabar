/**
 * Created by mikedanylov on 3/20/16.
 */

Template.registerHelper('isAdmin', function(adminsList) {
    return !!(Meteor.user() && adminsList.indexOf(Meteor.user().username) >= 0);
});

Template.registerHelper('isKabarAdmin', function() {
    return !!(Meteor.user() && Meteor.user().username === 'kabaradmin');
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