Template.fratSubscriberView.helpers({

  mealRequests: function() {
    return MealRequests.find({ fraternity: this._id, user: Meteor.userId() });
  }

});
