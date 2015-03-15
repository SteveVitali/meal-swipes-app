Fraternities = new Meteor.Collection('fraternities');
MealRequests = new Meteor.Collection('meal_requests');

Fraternities.allow({
  update: function(userId, doc, fieldNames, modifier) {
    return userId == doc.chef || userId == doc.admin;
  }
});

Schema = {};

Schema.DietaryPreferences = new SimpleSchema({
  vegetarian: { 
    type: Boolean,
    defaultValue: false
  },
  vegan: { 
    type: Boolean,
    defaultValue: false
  },
  glutenFree: { 
    type: Boolean,
    defaultValue: false
  },
  dairyFree: { 
    type: Boolean,
    defaultValue: false
  },
  kosher: { 
    type: Boolean,
    defaultValue: false
  },
  halal: { 
    type: Boolean,
    defaultValue: false
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['male', 'female'],
    optional: true
  },
  services: {
    type: Object,
    blackbox: true
  },
  dietaryPreferences: {
    type: Schema.DietaryPreferences
  }
});

Schema.Subscriber = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  mealSwipes: {
    type: Number,
    defaultValue: 0
  }
});

Schema.MealType = new SimpleSchema({
  mainDish: {
    type: String
  },
  details: {
    type: String,
    optional: true
  },
  mealTime: {
    type: String,
    allowedValues: ['breakfast', 'brunch', 'lunch', 'dinner']
  }
});

Schema.Fraternity = new SimpleSchema({
  name: {
    type: String
  },
  chef: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  admin: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  subscribers: {
    type: [Schema.Subscriber],
    optional: true
  },
  menu: {
    type: [Schema.MealType],
    optional: true,
    label: 'Meals'
  }
});

Schema.MealRequest = new SimpleSchema({
  mealType: {
    type: Schema.MealType
  },
  user: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  fraternity: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  isLatePlate: {
    type: Boolean,
    defaultValue: false
  },
  requestedAt: {
    type: Date
  },
  preparedAt: {
    type: Date,
    optional: true
  },
  receivedAt: {
    type: Date,
    optional: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    optional: true
  },
  feedback: {
    type: String,
    optional: true
  }
});

Meteor.users.attachSchema(Schema.User);
Fraternities.attachSchema(Schema.Fraternity);
MealRequests.attachSchema(Schema.MealRequest);
