/**
 * Created by mikedanylov on 5/1/16.
 */

import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './single-song-block.html';

Template.singleSongBlock.events({
    'click button.drop-down': function (event) {
        var songName, songPlacesLists, currentElem, chevronDown, chevronUp;
        songName = this.name;
        // use quotation marks around songName because it can contain spaces
        currentElem = $(".song-actions-wrapper[data-song-name=\"" + this.name + "\"]");
        chevronDown = $(".song-tile[data-song-name=\"" + this.name + "\"] .fa-angle-down");
        chevronUp = $(".song-tile[data-song-name=\"" + this.name + "\"] .fa-angle-up");
        songPlacesLists = $(".song-actions-wrapper");
        songPlacesLists.slideUp('fast');
        if (currentElem.hasClass('active')) {
            songPlacesLists.removeClass('active');
            $('.fa-angle-up').hide();
            $('.fa-angle-down').show();
        } else {
            songPlacesLists.removeClass('active');
            currentElem.addClass('active');
            $('.fa-angle-up').hide();
            $('.fa-angle-down').show();
            chevronDown.hide();
            chevronUp.show();
            currentElem.slideDown();
        }
    }
});
