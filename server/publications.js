// Meteor.publish definitions
Meteor.publish('fraternities', function () {
  return Fraternities.find({});
});