// Meteor.methods definitions
Meteor.methods({

  submitMealRequest: function(mealType, fratId, isLatePlate) {
    if (!Meteor.userId()) return console.log('Not logged in');

    MealRequests.insert({
      mealType: mealType,
      user: Meteor.userId(),
      fraternity: fratId,
      isLatePlate: isLatePlate,
      requestedAt: new Date()
    });
  },

  cancelMealRequest: function(mealRequest) {
    if (!Meteor.userId()) return console.log('Not logged in');
    if (!Meteor.userId() === mealRequest.user) {
      return console.log('Invalid user');
    }
    MealRequests.remove(mealRequest._id);
  },

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

  addChefToFraternity: function(fratId, username) {
    var chefUser = Meteor.users.findOne({username: username});
    if (!chefUser) return console.log('User does not exist');

    Fraternities.update(
      { _id: fratId }, 
      { $set: { chef: chefUser._id } }
    );
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
