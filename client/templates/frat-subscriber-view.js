Template.fratSubscriberView.helpers({

  mealRequests: function() {
    return MealRequests.find({ fraternity: this._id, user: Meteor.userId() });
  },

  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }

});

Template.fratSubscriberView.events({
  'click .cancel-meal-req': function(event, template) {
    console.log('cancel meal request');
  },

  'click .give-meal-feedback': function(event, template) {
    console.log('open feedback form');
  },

  'click .request-meal': function(event, template) {
    console.log('requesting meal');
  }
});
