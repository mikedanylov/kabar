
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

CommentsSchema = new SimpleSchema({
	username: {
		type: String,
		label: 'User name'
	},
	text: {
		type: String,
		label: 'Text of the comment'
	},
	votes: {
       type: Number,
       label: 'Number of votes',
       defaultValue:  0
   },
    voters: {
        type: [Object],
        label: 'Users who voted for this comment'
    },
    'voters.$.username': {
        type: String,
        label: 'User who already voted for this comment'
    },
    'voters.$.voted': {
        type: Number,
        label: 'Result of user vote upvoted/downvoted'
    },
	createdAt: {
		type: Date,
		label: 'Created at',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			}
		}
	}
});

Comments.attachSchema(CommentsSchema);

Meteor.methods({
    'comments.add'(username, text) {
        new SimpleSchema({
            username: { type: String, label: 'Username' },
            text: { type: String, label: 'Text of the comment' }
        }).validate({username, text});

        var cur = Comments.insert({
            username: username,
            text: text,
            votes: 0,
            voters: [],
            createdAt: new Date()
        });
        console.log('Meteor::methods::comments.add: comment added with id ' + cur);
        return cur;
    },
    'comments.increment'(commentObj, currentUser, inc) {
        // new SimpleSchema({
        //     commentObj: { type: Object, label: 'Comment Object' },
        //     currentUser: { type: String, label: 'Current user name' },
        //     inc: { type: Number, label: 'Votes increment value' }
        // }).validate({commentObj, currentUser, inc});

        if (!commentObj.voters.length) {
            Comments.update({_id: commentObj._id}, {
                $inc: {votes: inc},
                $push: {voters: {username: currentUser, voted: inc}}
            });
            return 'new comment inserted';
        } else {
            commentObj.voters.forEach(function isInArray(voter) {
                if (voter.username === currentUser &&
                    ((voter.voted >= 0 && inc < 0) || (voter.voted <= 0 && inc > 0))) {
                    Comments.update({_id: commentObj._id, "voters.username": currentUser}, {
                        $inc: {votes: inc, "voters.$.voted": inc}
                    });
                }
            });
            return 'comment is incremented ' + inc;
        }
    }
});

/**
 * publish all Comments from database
 * @return  {object}    mongodb cursor for all karaoke places
 */
Meteor.publish('comments', () => {
    return Comments.find();
});
