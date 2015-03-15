// Meteor.publish definitions
Meteor.publish('fraternities', function () {
  return Fraternities.find({});
});

Meteor.publish('mealRequests', function () {
  return MealRequests.find({});
});

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId);
});
