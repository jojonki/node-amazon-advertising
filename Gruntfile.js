module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['*.js', 'views/*.ejs', 'routes/*.js', 'public/javascripts/*.js', 'public/stylesheets/*.css'],
      tasks: ['cssmin'],
      options: {
        livereload: true
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
