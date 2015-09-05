module.exports = function(grunt) {

    grunt.initConfig({
        manifest: {
          generate: {
            options: {
              basePath: ".",
              network: ["http://*", "https://*"],
             /* cache: ['http://fonts.googleapis.com/icon?family=Material+Icons'],*/
              fallback: ["/ /offline.html"],
              exclude: ["js/jquery.min.js","build/fonts"],
              preferOnline: true,
              timestamp: true
            },
            src: [
                "images/**/*",
                "guides/*.html",
                "partials/*.html",
                "data/**/*.json",
                "build/**/*"
            ],
            dest: "manifest.appcache"
          }
        },
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'build/build.min.css': ['build/build.css']
          }
        }
      },
      uglify: {
        issues: {
          files: {
            'build/issues.min.js': ['build/issues.js']
          }
        }
      },
      concat: {
        issues: {
            options: {
              banner: 'var model = model || { enquiryMap: {} };' + 
                      'model.issueList = {',
              footer: ' }; ',
              stripBanners: true
            },
            src: [ 'data/zh/*.js' ],
            dest: 'build/issues.js'
        },
        js: {
            src: [
                  /* Angular.js */
                  'bower_components/angular/angular.min.js',
                  'bower_components/angular-route/angular-route.min.js',
                  'bower_components/angular-sanitize/angular-sanitize.min.js',
                  'bower_components/angular-animate/angular-animate.min.js',
                  'bower_components/angular-awesome-slider/dist/angular-awesome-slider.min.js',
                  /* Custom js files */
                  'js/app.js',
                  'js/controllers/*.js',
                  'js/factories/*.js',
                  /* Google MDL */
                  'bower_components/material-design-lite/material.min.js'
                  ],

            dest: 'build/build.js',
        },
        css: {
            src: [
                  'bower_components/normalize.css/normalize.css',
                  'bower_components/material-design-lite/material.min.css',
                  'bower_components/angular-awesome-slider/dist/css/angular-awesome-slider.min.css',
                  'css/font.css',
                  'css/general.css',
                  'css/layout.css',
                  'css/animation.css',
                  ],

            dest: 'build/build.css',
        }
      }
    });

    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['manifest','concat','uglify']);

};
