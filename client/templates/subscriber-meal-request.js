Template.subscriberMealRequest.helpers({
  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }
});

Template.subscriberMealRequest.events({
  'click .cancel-meal-req': function(event, template) {
    Meteor.call('cancelMealRequest', this);
  },

  'click .give-meal-feedback': function(event, template) {
    console.log('open feedback form');
  },

  'click .claim-meal': function(event, template) {
    var claimMealForm = {
      template: Template.claimMealForm,
      title: 'Claim Meal',
      buttons: {
        'cancel': {
          class: 'btn-danger',
          label: 'Cancel'
        },
        'claim': {
          closeModalOnClick: true,
          class: 'claim-meal-request btn-info',
          label: 'Claim Meal'
        },
      },
      doc: this
    };

    var formModal   = ReactiveModal.initDialog(claimMealForm);
    var mealRequest = this;
    var fraternity  = Template.parentData(1);

    formModal.buttons.claim.on('click', function(button) {
      Meteor.call('claimMealRequest', fraternity, mealRequest);
    });

    formModal.show();
  }
});
