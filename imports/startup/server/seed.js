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
    //     name: 'Californication',
    //     artist: 'Red Hot Chilly Peppers',
    //     popularity: '0',
    //     duration: '3:24',
    //     places: ['Swengi', 'The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Live To Rise',
    //     artist: 'Soundgarden',
    //     popularity: '1',
    //     duration: '4:40',
    //     places: ['Swengi']
    // });
    // Songs.insert({
    //     name: 'No One Knows',
    //     artist: 'Queens of the Stone Age',
    //     popularity: '2',
    //     duration: '4:38',
    //     places: ['Karaoke-bar', 'Swengi', 'The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Old Enough',
    //     artist: 'Raconteurs',
    //     popularity: '3',
    //     duration: '3:57',
    //     places: ['Karaoke-bar', 'Swengi']
    // });
    // Songs.insert({
    //     name: 'Guaranteed',
    //     artist: 'Eddie Vedder',
    //     popularity: '4',
    //     duration: '7:22',
    //     places: ['Karaoke-bar', 'The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Society',
    //     artist: 'Eddie Vedder',
    //     popularity: '5',
    //     duration: '3:55',
    //     places: ['Karaoke-bar']
    // });
    // Songs.insert({
    //     name: 'My Medicine',
    //     artist: 'The Pretty Reckless',
    //     popularity: '6',
    //     duration: '3:13',
    //     places: ['Karaoke-bar', 'Swengi', 'The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Wishlist',
    //     artist: 'Perl Jam',
    //     popularity: '7',
    //     duration: '3:26',
    //     places: ['Karaoke-bar', 'Swengi']
    // });
    // Songs.insert({
    //     name: 'Sour Girl',
    //     artist: 'Stone Temple Pilots',
    //     popularity: '8',
    //     duration: '4:16',
    //     places: ['Swengi', 'The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Save Me',
    //     artist: 'Shinedown',
    //     popularity: '9',
    //     duration: '3:33',
    //     places: ['The Louder The Better']
    // });
    // Songs.insert({
    //     name: 'Nutshell',
    //     artist: 'Alice In Chains',
    //     popularity: '10',
    //     duration: '4:19',
    //     places: ['The Louder The Better']
    // });
    // END INSERT SONGS ###############################################################################################


    // INSERT PLACES ##################################################################################################
    // Places.remove({});
    // Places.insert({
    //     name: 'The Louder The Better',
    //     admin: ['louder-admin', 'kabaradmin', 'Mike Danylov'],
    //     address: 'Rautatientori 1, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Swengi',
    //     admin: ['kabaradmin', 'kabaradmin', 'amritg'],
    //     address: 'Iso Roobertinkatu 10, Helsinki',
    //     popularity: '10',
    //     latitude: 60.1712419,
    //     longitude: 24.942252
    // });
    // Places.insert({
    //     name: 'Karaoke-bar',
    //     admin: ['karaoke-admin', 'kabaradmin'],
    //     address: 'Helsinginkatu 15, Helsinki',
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
