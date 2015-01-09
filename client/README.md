As a convention, Meteor will only run files in the `client` 
directory on the client. This replaces the `Meteor.isClient` conditional.

All files loaded on the client are automatically concatenated and minified when in production mode.

Meteor scans all the HTML files in your directory for <head>, <body>, and <template> elements. 
The head and body sections are separately concatenated into a single head and body, 
which are transmitted to the client on initial page load.