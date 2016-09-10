/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    fingerprint: {
      extensions: ['js', 'css', 'map']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import(app.bowerDirectory + '/tether/dist/js/tether.min.js');
    app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.min.js');
    app.import(app.bowerDirectory + '/perfect-scrollbar/css/perfect-scrollbar.min.css');
    app.import(app.bowerDirectory + '/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js');
    app.import(app.bowerDirectory + '/chart.js/dist/Chart.bundle.min.js');
    app.import(app.bowerDirectory + '/summernote/dist/summernote.min.js');
    app.import(app.bowerDirectory + '/summernote/dist/summernote.css');
    var summernoteAssets = new Funnel(app.bowerDirectory + '/summernote/dist/', {
      srcDir: '/',
      include: ['**/*.js', '**/*.eot', '**/*.woff', '**/*.ttf'],
      destDir: '/assets'
    });
    app.import(app.bowerDirectory + '/moment/min/moment.min.js');
    app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker-bs3.css');
    app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker.js');
    app.import(app.bowerDirectory + '/select2/dist/css/select2.min.css');
    app.import(app.bowerDirectory + '/select2-bootstrap-theme/dist/select2-bootstrap.min.css');
    app.import(app.bowerDirectory + '/select2/dist/js/select2.min.js');
  }

  return app.toTree(summernoteAssets);
};
