
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Lyrics = new Mongo.Collection('lyrics');

OrdersSchema = new SimpleSchema({
	song: {
		type: String,
		label: 'Lyrics song name'
	},
   text: {
       type: String,
       label: 'Lyrics text'
   },
	createdAt: {
		type: Date,
		label: 'Lyrics created at',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			}
		}
	}
});

Lyrics.attachSchema(OrdersSchema);

Meteor.methods({

});

/**
 * publish all Lyrics from database
 * @return  {object}    mongodb cursor for all songs lyrics
 */
Meteor.publish('lyrics', () => {
    return Lyrics.find();
});
