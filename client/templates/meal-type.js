Template.mealType.events({
  'click .request-meal': function(event, template) {
    var frat = Template.parentData(1);
    Meteor.call('submitMealRequest', this, frat._id);
  }
});
