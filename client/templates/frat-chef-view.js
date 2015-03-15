Template.fratChefView.helpers({
  mealRequests: function() {
    return MealRequests.find({ fraternity: this._id });
  }
});
