
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
        type: [String],
        label: 'Users who voted for this comment'
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

        // check if user has voted already
        if (!commentObj.voters ||
            (commentObj.voters.length && commentObj.voters.indexOf(currentUser) === -1)) {
            return Comments.update({_id: commentObj._id}, {
                $inc: {votes: inc},
                $push: {voters: currentUser}
            });
        }

        //
        // if (curComment[0].voters && curComment[0].voters.length) {
        //     curComment[0].voters.forEach(function (voter) {
        //         if (voter.hasOwnProperty(currentUser)) {
                    // if (inc > 0 && voter.currentUser !== 'upvoted') {
                    //     return Comments.update({_id: commentId}, {
                    //         $inc: {votes: inc},
                    //         $set: {voters: {currentUser: 'upvoted'}}
                    //     });
                    // } else if (inc < 0 && voter.currentUser !== 'downvoted') {
                    //     return Comments.update({_id: commentId}, {
                    //         $inc: {votes: inc},
                    //         $set: {voters: {currentUser: 'downvoted'}}
                    //     });
                    // }
            //     } else {
            //         if (inc > 0) {
            //             return Comments.update({_id: commentId}, {
            //                 $inc: {votes: inc},
            //                 $push: {voters: {currentUser: 'upvoted'}}
            //             });
            //         } else {
            //             return Comments.update({_id: commentId}, {
            //                 $inc: {votes: inc},
            //                 $push: {voters: {currentUser: 'downvoted'}}
            //             });
            //         }
            //     }
            // });
        // } else {
        //     if (inc > 0) {
        //         return Comments.update({_id: commentId}, {
        //             $inc: {votes: inc},
        //             $push: {voters: {currentUser: 'upvoted'}}
        //         });
        //     } else {
        //         return Comments.update({_id: commentId}, {
        //             $inc: {votes: inc},
        //             $push: {voters: {currentUser: 'downvoted'}}
        //         });
        //     }
        // }
        // } else {
        //     if (curComment.voters.currentUser === 'upvoted' && inc < 0) {
        //         return Comments.update({_id: commentId}, {
        //             $inc: {votes: inc},
        //             $pop: {voters: {currentUser: 'upvoted'}}
        //         });
        //     }
        // }
    }
});

/**
 * publish all Comments from database
 * @return  {object}    mongodb cursor for all karaoke places
 */
Meteor.publish('comments', () => {
    return Comments.find();
});
