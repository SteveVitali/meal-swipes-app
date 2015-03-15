As a convention, Meteor will only run files in the `server`
directory on the server. This replaces the `Meteor.isServer` conditional,
except the code isn't even sent to the client.

Meteor gathers all JavaScript files, excluding anything under the client, 
public, and private subdirectories, and loads them into a Node.js server instance.
