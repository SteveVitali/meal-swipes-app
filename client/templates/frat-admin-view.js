Template.fratAdminView.events({
  'click .add-chef': function(event, template) {
    var chefUsername = template.$('.chef-username-input').val();
    if (!chefUsername) return;
    Meteor.call('addChefToFraternity', this._id, chefUsername);
  }
});