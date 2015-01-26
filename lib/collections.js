Fraternities = new Meteor.Collection('fraternities');
MealTypes = new Meteor.Collection('meal-types');
MealRequests = new Meteor.Collection('meal-requests');

var Schema = {};

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
  pendingMeals: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: []
  },
  mealSwipes: {
    type: Number,
    defaultValue: 0
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
    defaultValue: []
  }
});

Schema.MealType = new SimpleSchema({
  fraternity: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Fraternity where meal is available"
  },
  mainDish: {
    type: String
  },
  detail: {
    type: String,
    optional: true
  },
  mealTime: {
    type: String,
    allowedValues: ['breakfast', 'lunch', 'brunch', 'dinner']
  },
  availableFrom: {
    type: Date
  },
  availableTo: {
    type: Date
  },
  datePosted: {
    type: Date
  }
});

Schema.MealRequest = new SimpleSchema({
  mealType: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  user: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  isLatePlate: {
    type: Boolean,
    defaultValue: false
  },
  prepareBy: {
    type: Date
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
MealTypes.attachSchema(Schema.MealType);
MealRequests.attachSchema(Schema.MealRequest);
