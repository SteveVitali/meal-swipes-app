Template.chefMealRequest.helpers({
  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }
});

Template.subscriberMealRequest.events({
  'click .mark-as-prepared': function(event, template) {
    console.log('mark meal as prepared');
  },

  'click .view-meal-feedback': function(event, template) {
    console.log('open feedback data');
  }
});
