Template.appBody.helpers({

  fratSubscriptions: function() {
    var subscriptions = Meteor.user().fraternity_subscriptions || [];
    var ids = _.pluck(subscriptions, 'frat_id');
    return Fraternities.find({_id: {$in: ids}});
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

  'click .register-frat': function(event, template) {
    var fratName = template.$('.frat-name-input').val();
    if (!fratName) return;

    var exists = Fraternities.findOne({name: fratName});
    if (exists)
      return console.log('Fraternity already exists');

    Meteor.call('addFraternity', fratName);
  }
});