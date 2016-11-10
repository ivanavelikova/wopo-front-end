import Ember from 'ember';
import moment from 'moment';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  intl: service(),

  projects: computed.sort('model', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  haveProjects: computed('projects', function () {
    const projects = this.get('projects');

    return Array.isArray(projects) && projects.length > 0;
  }),

  addProjects: {
    name: null,
    startDate: null,
    endDate: null,
    image_url: null,
    description: null
  },
  addProjectsModalVisible: null,
  addProjectsAlert: {
    type: null,
    content: null
  },

  editProjects: {
    id: null,
    name: null,
    startDate: null,
    endDate: null,
    image_url: null,
    description: null
  },
  editProjectsModalVisible: null,
  editProjectsAlert: {
    type: null,
    content: null
  },

  actions: {
    add () {
      const data = this.get('addProjects');

      this
        .get('store')
        .createRecord('project', {
          cover: data.image_url,
          name: data.name,
          description: data.description,
          start_date: data.startDate,
          end_date: data.endDate
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addProjectsModalVisible', false);
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addProjectsAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete (project) {
      project.destroyRecord();
    },

    updateEdit (project) {
      const startDate = moment(project.get('start_date')).format('MM/DD/YYYY');
      const endDate = moment(project.get('end_date')).format('MM/DD/YYYY');

      this.set('editProjects.id', project.get('id'));
      this.set('editProjects.name', project.get('name'));
      this.set('editProjects.startDate', startDate);
      this.set('editProjects.endDate', endDate);
      this.set('editProjects.image_url', project.get('cover'));
      this.set('editProjects.description', project.get('description'));
    },

    edit () {
      const editedProject = this.get('editProjects');

      this
        .get('store')
        .findRecord('project', editedProject.id)
        .then(project => {
          project.set('cover', editedProject.image_url);
          project.set('name', editedProject.name);
          project.set('description', editedProject.description);
          project.set('start_date', editedProject.startDate);
          project.set('end_date', editedProject.endDate);

          project
            .save()
            .then(() => {
              this.set('editProjectsModalVisible', false);

              this.set('editProjects.id', null);
              this.set('editProjects.name', null);
              this.set('editProjects.startDate', null);
              this.set('editProjects.endDate', null);
              this.set('editProjects.image_url', null);
              this.set('editProjects.description', null);
            })
            .catch(reason => {
              let alertContent = this.get('intl').t('errors.serverFail');

              if (reason.errors[0].detail) {
                alertContent = reason.errors[0].detail;
              }

              this.set('editProjectsAlert', {
                type: 'danger',
                content: alertContent
              });
            });
        });
    }
  }
});
