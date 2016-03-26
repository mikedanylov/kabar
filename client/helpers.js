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
    printAll: function () {
        console.log('data: ');
        console.log(this);
    },
    songs: function() {
        return this.songs;
    },
    orders: function() {
        return this.orders;
    },
    getSongName: function(songName) {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongName: ' + currentSong.name);
        return currentSong.name;
    },
    getSongArtist: function(songName) {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongArtist: ' + currentSong.artist);
        return currentSong.artist;
    },
    getSongDuration: function(songName) {
        var currentSong = Songs.findOne({name: songName});
        console.log('Template::placeKaraoke::helpers::getSongDuration: ' + currentSong.duration);
        return currentSong.duration;
    }
});

Template.songsList.helpers({
    songs: function() {
        return Songs.find();
    }
});

Template.home.helpers({
   username: function() {
       var user = Meteor.user();
       if (user) {
           if (user.hasOwnProperty('profile')) {
               console.log(user.profile.name);
               return user.profile.name;
           } else {
               console.log(user);
               return user.username;
           }
       } else {
           console.log('Not logged in');
       }
   }
});
