/**
 * Created by mikedanylov on 2/20/16.
 */

import { getUserName } from '../../globals';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.songs.events({
    'click .remove': function(event) {
        Songs.remove(this._id);
    }
});

Template.songsList.helpers({
    songs: function() {
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

Template.songShow.events({
    'click .place-order': function(event) {
        var song, place, currentUser;
        song = Songs.findOne({_id: document.querySelector('#song-id').innerHTML});
        place = this;
        currentUser = getUserName(Meteor.user());
        Meteor.call('orders.placeOrder', song.name, place.name, currentUser,
        (err, res) => {
            if (err && err.length) {
                console.log('Template::songShow::events: ' + err);
            } else {
                console.log('Template::songShow::events: ' + res);
                Router.go('placeKaraoke', {_id: place._id});
            }
        });
    }
});

Template.songsList.onRendered(() => {
    $(".songs-link").addClass("active");
});
Template.songsList.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});
