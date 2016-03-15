Places = new Mongo.Collection('places');

// schema for songslist collection
PlacesSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
		max: 64
	},
	address: {
		type: String,
		label: 'Address',
		max: 256
	},
	popularity: {
		type: Number,
		label: 'Total reservation counter',
		defaultValue: 0,
		min: 0
	},
	location: {
		type: Object,
		label: 'Karaoke place location'
	},
	createdAt: {
		type: Date,
		label: 'Created at',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			}
		}
	},
	updatedAt: {
        type: Date,
        label: 'Updated at',
        optional: true, // not sure about this, might not work when updating
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});

Places.attachSchema(PlacesSchema);
