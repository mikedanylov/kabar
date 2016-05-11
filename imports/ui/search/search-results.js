/**
 * Created by mikedanylov on 4/10/16.
 */

import { Temlpate } from 'meteor/templating';
import { SearchSource } from 'meteor/meteorhacks:search-source';

import './search-results.html';

export const SongSearch = new SearchSource('songs', ['song', 'artist'], {
    keepHistory: 1000 * 60 * 5, // 5 hours
    localSearch: true
});

Template.searchResults.helpers({
   results: () => {
       let res = SongSearch.getData({
           transform: (matchText, regExp) => {
               return matchText.replace(regExp, "$&")
           },
           sort: {name: 1, artist: 1},
           limit: 5
       });
       console.log('Template::searchResults::helpers::results: ');
       console.log(res);
       return res;
   },
    isLoading: () => {
        return SongSearch.getStatus().loading;
    }
});