/**
 * Created by mikedanylov on 4/19/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Comments } from  '/imports/startup/client/collections.js';
import { getUserName } from '/imports/startup/client/globals.js';

import './feedback.html';
import './feedback-form.html';
import './single-comment.html';

Template.feedback.onRendered(function () {
    $(".feedback-link").addClass("active");
    $("a.navbar-brand").text('feedback');
});
Template.feedback.onDestroyed(function () {
    $(".feedback-link").removeClass("active");
});

Template.feedback.helpers({
   comments: function () {
       return Comments.find({}, {sort: {votes: -1}});
   }
});

Template.feedbackForm.events({
    'click button#comment-submit': function (event) {
        let text = document.querySelector('input.comment-text').value;
        Meteor.call('comments.add', getUserName(Meteor.user()), text,
        (err, res) => {
            if (err && err.length) {
                console.log('Template::feedbackForm::events: ' + err);
            } else {
                console.log('Template::feedbackForm::events: ' + res);
            }
        });
    }
});

Template.singleComment.helpers({
    hasVotedUp: function () {
        var res = false;
        this.voters.forEach(function (voter) {
            console.log(voter);
           if (voter.username === getUserName(Meteor.user()) &&
                voter.voted === 1) {
               res = true;
           }
        });
        return res;
    },
    hasVotedDown: function () {
        var res = false;
        this.voters.forEach(function (voter) {
            console.log(voter);
            if (voter.username === getUserName(Meteor.user()) &&
                voter.voted === -1) {
                res = true;
            }
        });
        return res;
    }
});

Template.singleComment.events({
    'click .comment-upvote i, click .comment-downvote i': function voteForComment(event) {
        let currentComment, currentUser;
        currentComment = this;
        currentUser = getUserName(Meteor.user());
        Meteor.call('comments.increment', currentComment, currentUser,
            (/up/.test(event.target.className) ? 1 : -1),
        (err, res) => {
            if (err && err.length) {
                console.log('Template::singleComment::events:voteForComment:Error: ' + err);
            } else {
                console.log('Template::singleComment::events:voteForComment:Response ' + res);
            }
        });
        event.target.blur(); // for mobile to release focus
    }
});