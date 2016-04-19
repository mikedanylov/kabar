
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

Comments.attachSchema(OrdersSchema);

Meteor.methods({
    'comments.add'(username, text) {
        new SimpleSchema({
            username: { type: String, label: 'User name' },
            text: { type: String, label: 'Text of the comment' },
            createdAt: {
                type: Date,
                label: 'Created at',
                optional: true,
                defaultValue: function() {
                    return new Date();
                }
            }
        }).validate({username, text});

        var cur = Comments.insert({
            username: username,
            text: text,
            votes: 0,
            createdAt: new Date()
        });

        console.log('Meteor::methods::comments.add: comment added with id ' + cur);
        return cur;
    }
});

/**
 * publish all Comments from database
 * @return  {object}    mongodb cursor for all karaoke places
 */
Meteor.publish('comments', () => {
    return Comments.find();
});
