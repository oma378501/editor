Template.Settings.onRendered(function() {
  $( '#settings-form' ).validate({
      rules: {
          keystrokes: {
              required: true,
              min: 5
          },
          saveTimeout: {
              required: true,
              min: 1
          }
      },
      messages: {
          keystrokes: {
              required: 'Por favor, ingrese un numero mayor a 5'
          },
          saveTimeout: {
              required: 'Por favor, ingrese un numero mayor a 1'
          }
      },
      submitHandler: function() {
          var keystrokes    = $( '[name="keystrokes"]' ).val(),
            saveTimeout = $('[name="saveTimeout"]').val();

          Meteor.call('updateSettings', {
              keystrokes: keystrokes,
              saveTimeout: saveTimeout
          }, function(error) {
              if(error) {
                  console.log(error);
                  Bert.alert('Las configuraciones no han podido ser actualizadas, intente otra vez.', 'warning');
                  return;
              }

              Bert.alert('La configuraciones han sido actualizadas exitosamente!', 'success');
          })
      }
  });
});

Template.Settings.onCreated(function() {
  Template.instance().subscribe('settings');
});

Template.Settings.helpers({
  settings: function() {
    var settings = Settings.findOne();

    if (!settings) {
      return {
        keystrokes: 20,
        saveTimeout: 5
      }
    }

    return settings;
  }
});

Template.Settings.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});

