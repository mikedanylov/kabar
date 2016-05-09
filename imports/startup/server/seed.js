/**
 * Created by mikedanylov on 2/20/16.
 */

import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {Songs} from '/imports/api/songs/server/songs.js';
import {Places} from '/imports/api/places/server/places.js';
import {Orders} from '/imports/api/orders/server/orders.js';
import {Comments} from '/imports/api/feedback/server/comments.js';
import {Lyrics} from '/imports/api/lyrics/server/lyrics.js';

Meteor.startup(function () {

    // INSERT SONGS ###################################################################################################

    // remove current docs
    // Songs.remove({});
    // Songs.insert({
    //     name: 'Live To Rise',
    //     artist: 'Soundgarden',
    //     popularity: '1',
    //     duration: '4:40',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'No One Knows',
    //     artist: 'Queens of the Stone Age',
    //     popularity: '2',
    //     duration: '4:38',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Old Enough',
    //     artist: 'Raconteurs',
    //     popularity: '3',
    //     duration: '3:57',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'My Medicine',
    //     artist: 'The Pretty Reckless',
    //     popularity: '6',
    //     duration: '3:13',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Sour Girl',
    //     artist: 'Stone Temple Pilots',
    //     popularity: '8',
    //     duration: '4:16',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Save Me',
    //     artist: 'Shinedown',
    //     popularity: '9',
    //     duration: '3:33',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Nutshell',
    //     artist: 'Alice In Chains',
    //     popularity: '10',
    //     duration: '4:19',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Highway To Hell',
    //     artist: 'AC/DC',
    //     popularity: '10',
    //     duration: '3:28',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Back in Black',
    //     artist: 'AC/DC',
    //     popularity: '10',
    //     duration: '4:16',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Big Gun',
    //     artist: 'AC/DC',
    //     popularity: '10',
    //     duration: '4:24',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'King For A Day',
    //     artist: 'Green Day',
    //     popularity: '10',
    //     duration: '3:13',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Are You Gonna Be My Girl',
    //     artist: 'Jet',
    //     popularity: '10',
    //     duration: '4:36',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'She\'s A Genius',
    //     artist: 'Jet',
    //     popularity: '10',
    //     duration: '3:44',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'New Perspective',
    //     artist: 'Panic! At the Disco',
    //     popularity: '10',
    //     duration: '3:28',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Hell Yeah',
    //     artist: 'Rev Theory',
    //     popularity: '10',
    //     duration: '4:49',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Dani California',
    //     artist: 'Red Hot Chili Peppers',
    //     popularity: '10',
    //     duration: '4:42',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'What Are You Looking For',
    //     artist: 'Sick Puppies',
    //     popularity: '10',
    //     duration: '6:32',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Flathead',
    //     artist: 'The Fratellis',
    //     popularity: '10',
    //     duration: '3:40',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Creepin Up The Backstairs',
    //     artist: 'The Fratellis',
    //     popularity: '10',
    //     duration: '3:32',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Mr. Maker',
    //     artist: 'The Kooks',
    //     popularity: '10',
    //     duration: '3:00',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // Songs.insert({
    //     name: 'Many Shades of Black',
    //     artist: 'The Raconteurs',
    //     popularity: '10',
    //     duration: '4:38',
    //     places: ['KGB-Club', 'Yökyöpeli', "Jone's", "Anna K", "Pataässä"]
    // });
    // Songs.insert({
    //     name: 'Vagabond',
    //     artist: 'Wolfmother',
    //     popularity: '10',
    //     duration: '3:47',
    //     places: ['Restroom', 'Kuparikulma', "Populus", "Erottaja"]
    // });
    // END INSERT SONGS ###############################################################################################


    // INSERT PLACES ##################################################################################################
    // Places.remove({});
    // Places.insert({
    //     name: 'KGB-Club',
    //     admin: ['kgb-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Hallituskatu 3, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Restroom',
    //     admin: ['restroom-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Tehtaankatu 23 A, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Yökyöpeli',
    //     admin: ['yökyöpeli-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Fabianinkatu 17, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Kuparikulma',
    //     admin: ['kuparikulma-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Kuparitie 1, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Jone\'s',
    //     admin: ['jones-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Kaisaniemenkatu 13, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: "Populus",
    //     admin: ['populus-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Aleksis Kiven katu 22, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: "Anna K",
    //     admin: ['annak-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Annankatu 23, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: "Erottaja",
    //     admin: ['erottaja-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Erottajankatu 15-17, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: "Pataässä",
    //     admin: ['pataässä-admin', 'Mike Danylov', 'amritg'],
    //     address: 'Snellmaninkatu 13, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // END PLACES SONGS ###############################################################################################


    // INSERT USERS ###################################################################################################
    // Meteor.users.remove({});
    // Meteor.users.insert({
    //     username: 'karaokefan',
    //     emails: [
    //         {
    //             address: 'karaokefan@fan.com',
    //             verified: false
    //         }
    //     ]
    // });
    // Meteor.users.insert({
    //     username: 'admin',
    //     emails: [
    //         {
    //             address: 'admin@kabar.com',
    //             verified: false
    //         }
    //     ]
    // });
    // END PLACES USERS ###############################################################################################

    // INSERT ORDERS ##################################################################################################
    // Orders.remove({});
    // Orders.insert({
    //     username: 'karaokefan',
    //     song: 'Society',
    //     place: 'Karaoke-bar',
    //     priority: 1
    // });
    // Orders.insert({
    //     username: 'Paavo Rotti',
    //     song: 'My Medicine',
    //     place: 'Karaoke-bar',
    //     priority: 3
    // });
    // Orders.insert({
    //     username: 'admin',
    //     song: 'Californication',
    //     place: 'Karaoke-bar',
    //     priority: 4
    // });
    // Orders.insert({
    //     username: 'karaokefan',
    //     song: 'Society',
    //     place: 'Swengi',
    //     priority: 1
    // });
    // Orders.insert({
    //     username: 'Paavo Rotti',
    //     song: 'My Medicine',
    //     place: 'Swengi',
    //     priority: 3
    // });
    // Orders.insert({
    //     username: 'karaokefan',
    //     song: 'Californication',
    //     place: 'Swengi',
    //     priority: 4
    // });
    // Orders.insert({
    //     username: 'Mike Danylov',
    //     song: 'Society',
    //     place: 'The Louder The Better',
    //     priority: 1
    // });
    // Orders.insert({
    //     username: 'Paavo Rotti',
    //     song: 'My Medicine',
    //     place: 'The Louder The Better',
    //     priority: 3
    // });
    // Orders.insert({
    //     username: 'admin',
    //     song: 'Californication',
    //     place: 'The Louder The Better',
    //     priority: 4
    // });
    // END PLACES ORDERS ##############################################################################################

    // INSERT COMMENTS ################################################################################################
    // Comments.remove({});
    // Comments.insert({
    //     username: 'stranger',
    //     text: 'Just testing this feedback form',
    //     votes: 4,
    //     voters: [],
    //     createdAt: new Date()
    // });
    // Comments.insert({
    //     username: 'passanger',
    //     text: 'I am siiinging in the raaain :)',
    //     votes: 7,
    //     voters: [{ username: "Mike Danylov", voted: 1}],
    //     createdAt: new Date()
    // });
    // Comments.insert({
    //     username: 'anonymous',
    //     text: 'expect us',
    //     votes: 0,
    //     voters: [],
    //     createdAt: new Date()
    // });
    // END INSERT COMMENTS ############################################################################################

    // INSERT COMMENTS ################################################################################################
    // Lyrics.remove({});
    // Lyrics.insert({
    //     song: 'Californication',
    //     text:
    //     "Psychic spies from China\n" +
    //     "Try to steal your mind's elation\n" +
    //     "Little girls from Sweden\n" +
    //     "Dream of silver screen quotations\n" +
    //     "And if you want these kind of dreams\n" +
    //     "It's Californication\n" +
    //     "\n" +
    //     "It's the edge of the world\n" +
    //     "And all of western civilization\n" +
    //     "The sun may rise in the East\n" +
    //     "At least it settles in the final location\n" +
    //     "It's understood that Hollywood\n" +
    //     "Sells Californication\n" +
    //     "\n" +
    //     "Pay your surgeon very well\n" +
    //     "To break the spell of aging\n" +
    //     "Celebrity skin is this your chin\n" +
    //     "Or is that war you're waging?\n" +
    //     "\n" +
    //     "[Chorus:]\n" +
    //     "First born unicorn\n" +
    //     "Hard core soft porn\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "\n" +
    //     "Marry me girl be my fairy to the world\n" +
    //     "Be my very own constellation\n" +
    //     "A teenage bride with a baby inside\n" +
    //     "Getting high on information\n" +
    //     "And buy me a star on the boulevard\n" +
    //     "It's Californication\n" +
    //     "\n" +
    //     "Space may be the final frontier\n" +
    //     "But it's made in a Hollywood basement\n" +
    //     "Cobain can you hear the spheres\n" +
    //     "Singing songs off station to station\n" +
    //     "And Alderaan's not far away\n" +
    //     "It's Californication\n" +
    //     "\n" +
    //     "Born and raised by those who praise\n" +
    //     "Control of population everybody's been there and\n" +
    //     "I don't mean on vacation\n" +
    //     "\n" +
    //     "[Chorus:]\n" +
    //     "First born unicorn\n" +
    //     "Hard core soft porn\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "\n" +
    //     "Destruction leads to a very rough road\n" +
    //     "But it also breeds creation\n" +
    //     "And earthquakes are to a girl's guitar\n" +
    //     "They're just another good vibration\n" +
    //     "And tidal waves couldn't save the world\n" +
    //     "From Californication\n" +
    //     "\n" +
    //     "Pay your surgeon very well\n" +
    //     "To break the spell of aging\n" +
    //     "Sicker than the rest\n" +
    //     "There is no test\n" +
    //     "But this is what you're craving\n" +
    //     "\n" +
    //     "[Chorus:]\n" +
    //     "First born unicorn\n" +
    //     "Hard core soft porn\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n" +
    //     "Dream of Californication\n",
    //     createdAt: new Date()
    // });
    // END INSERT COMMENTS ############################################################################################
});
