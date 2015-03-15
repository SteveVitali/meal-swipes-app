Template.appBody.helpers({

  fratSubscriptions: function() {
    return Fraternities.find({ 'subscribers.userId': Meteor.userId() });
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
    $(event.target).parent().parent().next('.table').toggle();
  },

  'click .subscribe-frat': function(event, template) {
    var fratName = template.$('.subscribe-frat-input').val();
    if (!fratName) return;

    Meteor.call('subscribeToFraternity', fratName);
  },

  'click .register-frat-form-btn': function(event, template) {
    var registrationForm = {
      template: Template.registerFratForm,
      title: 'Register Fraternity',
      buttons: {
        'cancel': {
          class: 'btn-danger',
          label: 'Cancel'
        },
        'register': {
          closeModalOnClick: false,
          class: 'register-frat btn-info',
          label: 'Register'
        }
      }
    };

    var formModal = ReactiveModal.initDialog(registrationForm);

    formModal.buttons.register.on('click', function(button) {
      var fratName = $('.register-frat-input').val();
      if (!fratName) return;

      var exists = Fraternities.findOne({name: fratName});
      if (exists) {
        return console.log('Fraternity already exists');
      }

      Meteor.call('addFraternity', fratName);
      formModal.hide();
    });

    formModal.show();
  }
});
