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
        'min': [1],
        'max': [10]
      }
    });

    $('.rating-slider').Link('lower').to(
      '-inline-<div class="slider-tooltip"></div>', 
      function (val) {
        $(this).html('<span>' + val + '</span>');
      }
    );

    var meal = this;
    formModal.buttons.submit.on('click', function(button) {
      var rating = $('.rating-slider').val();
      var feedback = $('.feedback-input').val();
      Meteor.call('rateMeal', meal, rating, feedback);
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
