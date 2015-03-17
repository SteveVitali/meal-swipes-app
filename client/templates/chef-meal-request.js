Template.chefMealRequest.helpers({
  formatDate: function(timestamp) {
    var d = new Date(timestamp);
    dateString  = d.getMonth() + '-';
    dateString += d.getDate()  + '-';
    dateString += d.getYear();
    return dateString;
  }
});

Template.chefMealRequest.events({
  'click .mark-as-prepared': function(event, template) {
    var frat = Template.parentData(1);
    Meteor.call('markMealAsPrepared', frat, this);
  },

  'click .view-meal-feedback': function(event, template) {
    var mealFeedbackData = {
      template: Template.mealFeedbackData,
      title: 'Meal Feedback',
      buttons: {
        'close': {
          closeModalOnClick: true,
          class: 'btn-info',
          label: 'Close'
        },
      },
      removeOnHide: true,
      doc: this
    };

    var formModal = ReactiveModal.initDialog(mealFeedbackData);
    formModal.show();
  }
});
