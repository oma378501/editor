Accounts.emailTemplates.resetPassword.siteName = function() {Meteor.settings.private.applicationName};
Accounts.emailTemplates.resetPassword.from     = function() {Meteor.settings.private.applicationName + Meteor.settings.private.accountAdmin} ;
Accounts.emailTemplates.resetPassword.subject  = function() {Meteor.settings.private.applicationName + "Reset Your Password"};

Accounts.emailTemplates.resetPassword.text = function( user, url ){
  var emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = Meteor.settings.private.accountAdmin,
      emailBody      = "A password reset has been requested for the account related to this address (${emailAddress}). To reset the password, visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.";

  return emailBody;
};
