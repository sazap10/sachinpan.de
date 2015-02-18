module.exports = function (grunt) {
  var config = {
    // Clean
    express: {
        dev: {
            options: {
                script: 'app.js',
                debug: true,
                //background: false
            }
        }
    },
    clean: {
        // clean:release removes generated files
        release: [
            'public/css/*.css'
        ]
    },
    jshint: {
      options: {
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
        jshintrc: '.jshintrc',
      },
      gruntfile: 'Gruntfile.js',
      server: ['controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'app.js', 'config.js'],
      client: 'public/js/**/*.js'
    },
    concat: {
      css: {
        // add your css files over here to concatenate all css files
        // let's save our site users some bandwith
        src: ['public/vendor/fontawesome/css/font-awesome.min.css','public/vendor/bootstrap/dist/css/bootstrap.min.css', 'public/css/styles.min.css'],
        dest: 'public/css/app.styles.min.css'
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery'],
        },
        compress: {
          drop_console: true // <-
        }
      },
      target: {
        // add your js files over here to minify them into one javascript source file
        files:{
          'public/js/app.min.js': ['public/vendor/jquery/dist/jquery.min.js', 'public/vendor/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.min.js', 'public/vendor/bootstrap/dist/js/bootstrap.min.js', 'public/vendor/jquery.easing/js/jquery.easing.min.js', 'public/js/main.js']
        }
      }
    },
    stylus: {
      src: {
        files: [{
          expand: true,
          cwd: 'public/stylus',
          src: '**/*.styl',
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      src: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: '**/*.css',
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    'node-inspector': {
      options: {
        'save-live-edit': true
      }
    },
    watch: {
      options: {
        debounceDelay:  200,
        // livereload:     true
      },
      // all: {
      //   files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*'],
      //   options: {
      //     livereload: true
      //   }
      // },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      scripts: {
        files: 'public/js/**/*.js',
        tasks: ['jshint:client', 'uglify']
      },
      server: {
        files: '<%= jshint.server %>',
        tasks: 'jshint:server'
      },
      styl: {
        files: ['public/stylus/**/*.styl'],
        tasks: ['clean', 'stylus', 'autoprefixer', 'cssmin', 'concat:css']
      },
      express: {
        files:  [ 'app.js' ],
        tasks:  [ 'forever:server1:restart' ],
      }
    },
    copy: {
      main: {
       files: [{
         expand: true,
         cwd: 'public/vendor/fontawesome',
         src: 'fonts/*',
         dest: 'public/'
       }]
      }
    },
    concurrent: {
      tasks: ['forever:server1:start', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    autoprefixer: {
      main: {
          src: 'public/css/styles.css',
          dest: 'public/css/styles.css'
      },
    },
    forever: {
      server1: {
        options: {
          index: 'app.js',
          logDir: 'logs'
        }
      },
    }
  };

  grunt.initConfig(config);

  // Load the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('css', ['stylus', 'autoprefixer', 'cssmin', 'concat:css' ]);
  grunt.registerTask('default', ['clean','copy:main', 'jshint', 'uglify', 'css', 'concurrent' ]);
};
