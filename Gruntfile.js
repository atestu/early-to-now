module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    },
    watch: {
        // if any .less file changes in directory "css/" run the "less"-task.
        files: "css/main.less",
        tasks: ["less"],
        options: {
          livereload: true
        }
    },
    // "less"-task configuration
    less: {
        // production config is also available
        development: {
            options: {
                // Specifies directories to scan for @import directives when parsing.
                // Default value is the directory of the source, which is probably what you want.
                paths: ["css/"],
            },
            files: {
                // compilation.css  : source.less
                "css/main.css": "css/main.less"
            }
        },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};