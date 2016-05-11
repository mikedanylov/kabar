/**
 * Created by mikedanylov on 5/8/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places, Lyrics } from '/imports/startup/client/collections.js';

import  './add.html';

Template.songAdd.onRendered(function () {
    var placeObj = Template.instance().data.place;
    $("a.navbar-brand").text(Template.instance().data.place.name + ' songs');
    var validator = $('.add-song-form').validate({
        submitHandler: function(event) {
            var songName = document.querySelector('[name=song-name]').value;
            var songArtist = document.querySelector('[name=song-artist]').value;
            var songDuration = document.querySelector('[name=song-duration]').value;
            Meteor.call( 'songs.add', songName, songArtist, songDuration, placeObj.name, function errorHandling(error) {
                if (error) {
                    console.log('Failed to add new song: ' + error.reason);
                    if(error.reason == "Name is required"){
                        validator.showErrors({
                            'song-name': "Song Name field is required to add new song"
                        });
                    }
                    if(error.reason == "Artist is required"){
                        validator.showErrors({
                            'song-artist': "Song Artist field is required to add new song"
                        });
                    }
                    if(error.reason == "Duration is required"){
                        validator.showErrors({
                            'song-duration': "Song Duration field is required to add new song"
                        });
                    }
                } else {
                    Router.go('/places/' + placeObj._id + '/songs');
                }
            });
        }
    });
});
