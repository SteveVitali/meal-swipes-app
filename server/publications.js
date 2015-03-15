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

Meteor.publish('allUserData', function() {
  return Meteor.users.find({}, { fields: { username: 1 }});
});
