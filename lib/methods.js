// Meteor.methods definitions
Meteor.methods({

  addFraternity: function (name) {
    // Make sure the user is logged in before inserting a fraternity
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

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