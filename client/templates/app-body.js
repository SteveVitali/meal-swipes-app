Template.appBody.helpers({

  fratSubscriptions: function() {
    return Fraternities.find({ 'subscribers.user_id': Meteor.userId() });
  },

  fratAdministrations: function() {
    return Fraternities.find({admin: Meteor.userId()});
  },

  fratChefEmployments: function() {
    return Fraternities.find({chef: Meteor.userId()});
  }

});

Template.appBody.events({
  'click .title-link': function(event, template) {
    $(event.target).parent().parent().next('.panel-body').toggle();
  },

  'click .subscribe-frat': function(event, template) {
    var fratName = template.$('.subscribe-frat-input').val();
    if (!fratName) return;

    Meteor.call('subscribeToFraternity', fratName);
  },

  'click .register-frat': function(event, template) {
    var fratName = template.$('.register-frat-input').val();
    if (!fratName) return;

    var exists = Fraternities.findOne({name: fratName});
    if (exists)
      return console.log('Fraternity already exists');

    Meteor.call('addFraternity', fratName);
  }
});