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
    var mealFeedbackForm = {
      template: Template.mealFeedbackForm,
      title: 'Meal Feedback',
      buttons: {
        'cancel': {
          class: 'btn-danger',
          label: 'Cancel'
        },
        'submit': {
          closeModalOnClick: true,
          class: 'submit-feedback btn-info',
          label: 'Submit Feedback'
        },
      },
      removeOnHide: true,
      doc: this
    };

    var formModal = ReactiveModal.initDialog(mealFeedbackForm);

    $('.rating-slider').noUiSlider({
      start: [5],
      step: 1,
      range: {
        'min': [0],
        'max': [10]
      }
    });

    formModal.buttons.submit.on('click', function(button) {
      console.log('ayy lmao');
      console.log('slider value', $('#rating-slider').val());
    });

    formModal.show();
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
