Template.subscriberMealRequest.helpers({
  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }
});

Template.subscriberMealRequest.events({
  'click .cancel-meal-req': function(event, template) {
    Meteor.call('cancelMealRequest', this);
  },

  'click .give-meal-feedback': function(event, template) {
    console.log('open feedback form');
  }
});
