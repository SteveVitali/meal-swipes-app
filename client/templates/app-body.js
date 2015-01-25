Template.appBody.helpers({

  fratSubscriptions: function() {
    var ids = Meteor.user().fraternity_subscriptions || [];
    return Fraternities.find({_id: {$in: ids}});
  },

  fratAdministrations: function() {
    var ids = Meteor.user().fraternity_administrations || [];
    return Fraternities.find({_id: {$in: ids}});
  },

  fratChefEmployments: function() {
    console.log('user id', Meteor.userId());
    return Fraternities.find({chef: Meteor.userId()});
  }

});

Template.appBody.events({
  'click .title-link': function(event, template) {
    $(event.target).parent().parent().next('.panel-body').toggle();
  }
});