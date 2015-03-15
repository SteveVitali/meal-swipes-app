Template.chefMealRequest.helpers({
  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }
});

Template.chefMealRequest.events({
  'click .mark-as-prepared': function(event, template) {
    var frat = Template.parentData(1);
    Meteor.call('markMealAsPrepared', frat, this);
  },

  'click .view-meal-feedback': function(event, template) {
    console.log('open feedback data');
  }
});
