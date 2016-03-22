Template.CreateTask.onRendered(function() {
  $( '#create-task-form' ).validate({
    ignore: ":disabled",
    rules: {
      title: {
        required: true
      },
      description: {
        required: true
      },
      type: {
        required: true
      }
    },
    messages: {
      title: {
        required: 'Por favor, ingrese un nombre'
      },
      description: {
        required: 'Por favor, ingrese una descripcion'
      },
      type: {
        required: 'Por favor, ingrese un criterio de evaluacion'
      }
    },
    submitHandler: function() {
      var title    = $( '[name="title"]' ).val(),
        description = $('[name="description"]').val();
      type = $('[name="type"]').val();

      Tasks.insert({
        title: title,
        description: description,
        initialFileContent: 'public class Main() {}',
        type: type
      }, function(error, taskId) {
        console.log(arguments);
        if(error) {
          Bert.alert('La tarea no pudo ser creada, por favor intente otra vez.', 'warning');
          return;
        }

        Bert.alert('La tarea se creo exitosamente!', 'success');
        FlowRouter.go('task', {id: taskId});
      })
    }
  });
});

Template.CreateTask.onCreated(function() {
  this.selectedCriteria = new ReactiveVar(null);
});

Template.CreateTask.events({
  'submit form': function(event) {
    event.preventDefault();
  },
  'click a': function(event, template) {
    template.selectedCriteria.set(this);
  }
});

Template.CreateTask.helpers({
  criteriaIndex: function() {
    return CriteriaIndex;
  },
  inputAttribs: function() {
    return {
      class: "form-control",
      placeholder: "Filtrar criterios..."
    }
  },
  selectedCriteria: function() {
    console.log(Template.instance().selectedCriteria.get());
    return Template.instance().selectedCriteria.get();
  }
});
