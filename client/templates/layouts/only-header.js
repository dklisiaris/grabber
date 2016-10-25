import './only-header.html';
import {AppNavigation} from '/imports/ui/components/app-navigation';

Template.onlyHeader.helpers({
  AppNavigation() {
    return AppNavigation;
  }
});

Template.onlyHeader.onRendered(function () {

});
