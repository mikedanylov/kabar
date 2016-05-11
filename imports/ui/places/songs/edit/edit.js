/**
 * Created by mikedanylov on 5/8/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places, Lyrics } from '/imports/startup/client/collections.js';

import  './edit.html';

Template.songEdit.onRendered(function () {
    var placeObj = Template.instance().data.place;
    var songObj = Template.instance().data.song;
    $("a.navbar-brand").text(Template.instance().data.place.name + ' songs');
    var validator = $('.add-song-form').validate({
        submitHandler: function(event) {
            var songName = document.querySelector('[name=song-name]').value;
            var songArtist = document.querySelector('[name=song-artist]').value;
            var songDuration = document.querySelector('[name=song-duration]').value;
            Meteor.call( 'songs.update', songObj._id, songName, songArtist, songDuration, function errorHandling(error) {
                if (error) {
                    console.log('Failed to update the song: ' + error.reason);
                    if(error.reason == "Name is required"){
                        validator.showErrors({
                            'song-name': "Song Name field is required to  update the song"
                        });
                    }
                    if(error.reason == "Artist is required"){
                        validator.showErrors({
                            'song-artist': "Song Artist field is required to  update the song"
                        });
                    }
                    if(error.reason == "Duration is required"){
                        validator.showErrors({
                            'song-duration': "Song Duration field is required to  update the song"
                        });
                    }
                } else {
                    Router.go('/places/' + placeObj._id + '/songs');
                }
            });
        }
    });
});