// Meteor.methods definitions
Meteor.methods({

  subscribeToFraternity: function(name) {
    if (!Meteor.userId()) return console.log('Not logged in');

    var frat = Fraternities.findOne({ name: name });
    if (!frat) return console.log('Frat does not exist');

    var alreadySubscribed = false;
    var subscribers = frat.subscribers || [];
    _.each(subscribers, function(subscriber) {
      if (subscriber.userId == Meteor.userId()) {
        alreadySubscribed = true;
      }
    });
    if (alreadySubscribed) return console.log('User already subscribed');

    Fraternities.update(
      { _id: frat._id }, 
      { $addToSet: { 
          subscribers: {
            userId:  Meteor.userId(),
            pendingMeals: [],
            mealSwipes: 0
          }
        }
      }
    );
  },

  addFraternity: function (name) {
    // Make sure the user is logged in before inserting a fraternity
    if (!Meteor.userId()) return console.log('Not-authorized');

    Fraternities.insert({
      name: name,
      admin: Meteor.userId()
    });
  },

  deleteFraternity: function (fratId) {
    var frat = Fraternities.findOne(fratId);
    if (frat.admin !== Meteor.userId()) {
      // Only the admin can delete the fraternity
      return console.log('Not-authorized');
    }
    Fraternities.remove(fratId);
  }

});