Template.menuItem.events({
  'click .request-meal': function(event, template) {
    var requestMealForm = {
      template: Template.requestMealForm,
      title: 'Request Meal',
      buttons: {
        'cancel': {
          class: 'btn-danger',
          label: 'Cancel'
        },
        'late_plate': {
          closeModalOnClick: true,
          class: 'request-late-plate btn-warning',
          label: 'Request Late Plate'
        },
        'submit': {
          closeModalOnClick: true,
          class: 'submit-meal-request btn-info',
          label: 'Request Meal'
        },
      },
      doc: this
    };

    var formModal = ReactiveModal.initDialog(requestMealForm);

    var frat = Template.parentData(1);
    var meal = this;
    function submitMealRequest(isLatePlate) {
      Meteor.call('submitMealRequest', meal, frat._id, isLatePlate);
    }

    formModal.buttons.submit.on('click', function(button) {
      submitMealRequest(false);
    });

    formModal.buttons.late_plate.on('click', function(button) {
      submitMealRequest(true);
    });

    formModal.show();
  }
});
