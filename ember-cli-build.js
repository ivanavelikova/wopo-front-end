/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    fingerprint: {
      exclude: ['ckeditor'],
      extensions: ['js', 'css', 'map']
    },
    dotEnv: {
      clientAllowedKeys: ['URI', 'HOST_URL']
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
    app.import(app.bowerDirectory + '/ckeditor/ckeditor.js');
    app.import(app.bowerDirectory + '/moment/min/moment.min.js');
    app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker-bs3.css');
    app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker.js');
    app.import(app.bowerDirectory + '/select2/dist/css/select2.min.css');
    app.import(app.bowerDirectory + '/select2-bootstrap-theme/dist/select2-bootstrap.min.css');
    app.import(app.bowerDirectory + '/select2/dist/js/select2.min.js');
    app.import(app.bowerDirectory + '/to-markdown/dist/to-markdown.js');
    app.import(app.bowerDirectory + '/dropzone/dist/min/dropzone.min.js');
    app.import(app.bowerDirectory + '/showdown/dist/showdown.min.js');
    app.import(app.bowerDirectory + '/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js');
    app.import(app.bowerDirectory + '/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css');
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js');
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/dist/bootstrap-tagsinput.css');
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/dist/bootstrap-tagsinput-typeahead.css');
    app.import(app.bowerDirectory + '/typeahead.js/dist/typeahead.bundle.min.js');
    app.import(app.bowerDirectory + '/jquery.event.move/js/jquery.event.move.js');
    app.import(app.bowerDirectory + '/jquery.event.swipe/js/jquery.event.swipe.js');
    app.import(app.bowerDirectory + '/unslider/dist/js/unslider-min.js');
    app.import(app.bowerDirectory + '/unslider/dist/css/unslider.css');
    app.import(app.bowerDirectory + '/unslider/dist/css/unslider-dots.css');

    var ckeditorAssets = new Funnel(app.bowerDirectory, {
      srcDir: 'ckeditor',
      destDir: '/ckeditor'
    });
    
    var ckeditorMarkdownAssets = new Funnel(app.bowerDirectory, {
      srcDir: 'ckeditor-markdown-plugin',
      destDir: '/ckeditor/plugins'
    });

    assets = mergeTrees([ckeditorAssets, ckeditorMarkdownAssets]);
  }

  return app.toTree(assets);
};
