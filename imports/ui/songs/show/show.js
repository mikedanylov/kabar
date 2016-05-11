/**
 * Created by mikedanylov on 5/7/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places, Lyrics } from '/imports/startup/client/collections.js';

import  './show.html';

Template.songShow.helpers({
    insertSongLyrics: function (song) {

        trackSearchRequest(song)
            .then(lyricsSearchRequest)
            .then(appendLyrics)
            .catch(function(error) {
                    console.log('Could not get lyrics: ', error);
                    $('pre#song-lyrics').append('Sorry there are currently no lyrics for this song...');
                    throw new Meteor.Error('Could not get lyrics', error)
                });

        function trackSearchRequest(songObj) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '//api.musixmatch.com/ws/1.1/track.search',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        apikey: "b690a523f4fe3089f574e9b9696e5712",
                        q_artist: songObj.artist,
                        q_track: songObj.name,
                        f_has_lyrics: 1,
                        format: "jsonp",
                        jsonpCallback: "jsonpCallback"
                    },
                    success: function(resp) {
                        console.log('trackSearchRequest request success: ', resp);
                        if (resp.message.header.available) {
                            resolve(resp.message.body.track_list[0].track.track_id);
                        } else {
                            reject('Song or Artist is not found');
                        }
                    },
                    error: function (resp) {
                        console.log('trackSearchRequest request failed: ', resp);
                        reject(resp);
                    },
                    complete: function (resp) {
                        console.log('trackSearch request completed', resp);
                    }
                });
            });
        }

        function lyricsSearchRequest(trackId) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '//api.musixmatch.com/ws/1.1/track.lyrics.get',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        apikey: "b690a523f4fe3089f574e9b9696e5712",
                        track_id: trackId,
                        format: "jsonp",
                        jsonpCallback: "jsonpCallback"
                    },
                    success: function (resp) {
                        console.log('lyricsSearchRequest request success: ', resp);
                        resolve(resp.message.body.lyrics.lyrics_body);
                    },
                    error: function (resp) {
                        console.log('lyricsSearchRequest request failed: ', resp);
                        reject(resp);
                    },
                    complete: function (resp) {
                        console.log('lyricsSearch request completed', resp);
                    }
                });
            });
        }

        function appendLyrics(lyricsText) {
            if (lyricsText) {
                $('pre#song-lyrics').append(lyricsText);
            } else {
                $('pre#song-lyrics').append('Sorry there are currently no lyrics for this song...');
            }
        }

        
    },
    insertSongImage: function (song) {

        getArtistImage(song)
            .then(appendArtistImage)
            .catch(function(error) {
                console.log('Could not get artist image: ', error);
                throw new Meteor.Error('Could not get artist image', error)
            });

        function getArtistImage(songObj) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '//api.musixmatch.com/ws/1.1/track.search',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        apikey: "b690a523f4fe3089f574e9b9696e5712",
                        q_artist: songObj.artist,
                        q_track: songObj.name,
                        // f_has_lyrics: 1,
                        format: "jsonp",
                        jsonpCallback: "jsonpCallback"
                    },
                    success: function(resp) {
                        console.log('getArtistImage request success: ', resp);
                        if (resp.message.header.available) {
                            resolve(resp.message.body.track_list[0].track.album_coverart_350x350);
                        } else {
                            reject('Song image is not found');
                        }
                    },
                    error: function (resp) {
                        console.log('getArtistImage request failed: ', resp);
                        reject(resp);
                    },
                    complete: function (resp) {
                        console.log('getArtistImage request completed', resp);
                    }
                });
            });
        }
        
        function appendArtistImage(imgUrl) {
            if (imgUrl) {
                var img = document.createElement("img");
                img.src = imgUrl;
                $('#song-img-wrapper').append(img);
            } else {
                $('#song-img-wrapper').append('Sorry, there is currently no image for this song...');
            }
        }
    }
});

Template.songShow.events({
    'click .btn-book': function (event) {
        console.log(this);
        console.log(event);
        console.log(Template.instance().data.song);

        var song, place, currentUser;
        song = Template.instance().data.song;
        place = this;
        currentUser = getUserName(Meteor.user());
        Meteor.call('orders.placeOrder', song.name, place.name, currentUser,
        (err, res) => {
            if (err && err.length) {
                console.log('Template::songsList::events: ' + err);
            } else {
                console.log('Template::songsList::events: ' + res);
                Router.go('placeKaraoke', {_id: place._id});
            }
        });
    }
});

Template.songShow.onRendered(() => {
    $(".songs-link").addClass("active");
    $("a.navbar-brand").text('song');
});
Template.songShow.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});