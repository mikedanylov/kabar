import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { getUserName, changeHamburger } from '/imports/startup/client/globals';

import '/imports/ui/site/main.html';
import '/imports/ui/site/loading.html';

import '/imports/ui/site/site.less';
import '/imports/ui/site/table.css';

Template.main.events({
    'click #noNav': function (event) {
        if (window.innerWidth < 992) {
            $('#menu').collapse('hide');
            setTimeout(changeHamburger, 50);
        }

    }
});

