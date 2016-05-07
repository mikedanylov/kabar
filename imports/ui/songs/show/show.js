/**
 * Created by mikedanylov on 5/7/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import { getUserName } from '/imports/startup/client/globals';
import { Songs, Places } from '/imports/startup/client/collections.js';

import  './show.html';

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
});
Template.songShow.onDestroyed(() => {
    $(".songs-link").removeClass("active");
});