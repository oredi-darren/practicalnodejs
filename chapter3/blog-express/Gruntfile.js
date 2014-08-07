/**
 * Created by darren on 8/7/14.
 */
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.initConfig({
        reporter: 'list',
        ui: 'bdd',
        colors: true,
        // Configure a grunt-mocha-test task
        mochacli: {
            test: {
                options: {
                    reporter: '<%= reporter %>',
                    ui: '<%= ui %>',
                    colors: '<%= colors %>'
                },
                src: ['tests/**/*.js']
            }
        }
    });

    // Define the default task
    grunt.registerTask('default', ['mochacli']);
};