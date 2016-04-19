/**
 * Created by mikedanylov on 4/19/16.
 */

import { Meteor } from 'meteor/meteor';
import { Temlpate } from 'meteor/templating';

import './feedback.html';

Template.feedback.onRendered(() => {
    $(".feedback-link").addClass("active");
});
Template.home.onDestroyed(() => {
    $(".feedback-link").removeClass("active");
});
