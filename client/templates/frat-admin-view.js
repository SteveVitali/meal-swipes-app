Template.fratAdminView.helpers({
  getUsername: function(id) {
    var data = Meteor.users.findOne(
      { _id: id }, 
      { fields: { username: 1 }}
    );
    return data ? data.username : 'null';
  }
});

Template.fratAdminView.events({
  'click .add-chef': function(event, template) {
    var chefUsername = template.$('.chef-username-input').val();
    if (!chefUsername) return;
    Meteor.call('addChefToFraternity', this._id, chefUsername);
  }
});
