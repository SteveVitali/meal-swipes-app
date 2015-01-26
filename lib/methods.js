// Meteor.methods definitions
Meteor.methods({

  subscribeToFraternity: function(name) {
    if (!Meteor.userId()) throw new Meteor.Error('Not logged in');

    var frat = Fraternities.findOne({ name: name });
    if (!frat) throw new Meteor.Error('Frat does not exist');

    var alreadySubscribed = false;
    var subscriptions = frat.subscriptions || [];
    _.each(subscriptions, function(subscription) {
      if (subscription.user_id == Meteor.userId()) {
        alreadySubscribed = true;
      }
    });
    if (alreadySubscribed) throw new Meteor.Error('User already subscribed');

    Fraternities.update(
      { _id: frat._id }, 
      { $addToSet: { 
          subscribers: {
            user_id:  Meteor.userId(),
            pending_meals: [],
            meal_swipes: 0
          }
        }
      }
    );
  },

  addFraternity: function (name) {
    // Make sure the user is logged in before inserting a fraternity
    if (!Meteor.userId()) throw new Meteor.Error('Not-authorized');

    Fraternities.insert({
      name: name,
      admin: Meteor.userId()
    });
  },

  deleteFraternity: function (fratId) {
    var frat = Fraternities.findOne(fratId);
    if (frat.admin !== Meteor.userId()) {
      // Only the admin can delete the fraternity
      throw new Meteor.Error("not-authorized");
    }
    Fraternities.remove(fratId);
  }

});