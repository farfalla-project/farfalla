module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        //separator: ';'
      },
      bowercss: { // to be run before every cssmin
        src: [
          'bower_components/jquery-ui/themes/base/jquery-ui.min.css',
          'bower_components/font-awesome/css/font-awesome.min.css',
          'bower_components/qtip2/jquery.qtip.min.css'
        ],
        dest: 'src/css/vendor/bower.css',
      },
      distcss:{
        src: ['src/css/vendor/bower.css', 'src/css/farfalla.css'],
        dest: 'dist/farfalla.css'
      },
      distjs: {
        src: ['src/js/vendor/*.js','src/js/*.js','src/plugins/*/*.farfalla.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.description %> - generated on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.distjs.dest %>']
        }
      }
    },
    jasmine: {
      src: ['farfalla.js', 'dist/farfalla.js'],
      options: {
        specs: ['specs/**/*.js'],
        vendor: ['src/js/vendor/*.js', 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', 'bower_components/jquery/dist/jquery.min.js'],
        styles: [
                  'bower_components/jquery-ui/themes/base/jquery-ui.min.css',
                  'bower_components/font-awesome/css/font-awesome.min.css',
                  'bower_components/qtip2/jquery.qtip.min.css',
                  'src/css/farfalla.css'
                ]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js', 'test/**/*.js', 'src/plugins/*/*.farfalla.js', '<%= jasmine.options.specs %>'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= concat.distcss.src %>', '<%= jasmine.options.specs %>'],
      tasks: ['jshint', 'bower_concat', 'concat', 'jasmine', 'uglify']
    },
    bower_concat:{
      all: {
        dest: {
          js: "src/js/vendor/bower.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
//  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint', 'concat', 'uglify', 'qunit']);

  grunt.registerTask('default', ['jshint', 'bower_concat', 'concat', 'uglify']);

};
