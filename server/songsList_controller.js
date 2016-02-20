/**
 * Created by mikedanylov on 2/20/16.
 */
Meteor.startup(function () {

    // remove current docs
    SongsList.remove({});

    // seed fresh data each time server starts
    SongsList.insert({
        name: 'Californication',
        artist: 'Red Hot Chilly Peppers',
        popularity: '0',
        duration: '3:24',
        places: ['Swengi', 'The Louder The Better']
    });

    SongsList.insert({
        name: 'Live To Rise',
        artist: 'Soundgarden',
        popularity: '1',
        duration: '4:40',
        places: ['Swengi']
    });

    SongsList.insert({
        name: 'No One Knows',
        artist: 'Queens of the Stone Age',
        popularity: '2',
        duration: '4:38',
        places: ['Karaoke-bar', 'Swengi', 'The Louder The Better']
    });

    SongsList.insert({
        name: 'Old Enough',
        artist: 'Reconteurs',
        popularity: '3',
        duration: '3:57',
        places: ['Karaoke-bar', 'Swengi']
    });

    SongsList.insert({
        name: 'Guaranteed',
        artist: 'Eddie Vedder',
        popularity: '4',
        duration: '7:22',
        places: ['Karaoke-bar', 'The Louder The Better']
    });

    SongsList.insert({
        name: 'Society',
        artist: 'Eddie Vedder',
        popularity: '5',
        duration: '3:55',
        places: ['Karaoke-bar']
    });

    SongsList.insert({
        name: 'My Medicine',
        artist: 'The Pretty Reckless',
        popularity: '6',
        duration: '3:13',
        places: ['Karaoke-bar', 'Swengi', 'The Louder The Better']
    });

    SongsList.insert({
        name: 'Wishlist',
        artist: 'Perl Jam',
        popularity: '7',
        duration: '3:26',
        places: ['Karaoke-bar', 'Swengi']
    });

    SongsList.insert({
        name: 'Sour Girl',
        artist: 'Stone Temple Pilots',
        popularity: '8',
        duration: '4:16',
        places: ['Swengi', 'The Louder The Better']
    });

    SongsList.insert({
        name: 'Save Me',
        artist: 'Shinedown',
        popularity: '9',
        duration: '3:33',
        places: ['The Louder The Better']
    });

    SongsList.insert({
        name: 'Nutshell',
        artist: 'Alice In Chains',
        popularity: '10',
        duration: '4:19',
        places: ['The Louder The Better']
    });
});
