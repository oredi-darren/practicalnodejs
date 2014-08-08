/**
 * Created by darren on 8/7/14.
 */
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        mochacliConfig: grunt.file.readJSON("mochacli-config.json"),

        // Configure grunt-contrib-clean task
        clean: ["dist"],

        // Configure grunt-contrib-jshint task
        jshint: {
            options: {
                laxcomma: true
            },
            all: ['Gruntfile.js', 'specs/**/*.js', 'dist/js/**/.js']
        },

        // Configure grunt-contrib-copy task
        copy: {
            main: {
                files: [
                    {cwd: 'src', expand: true, src: ['**/*.jade'], dest: 'dist/', filter: 'isFile'},
                    {cwd: 'src/scripts', expand: true, src: ['**/*.js'], dest: 'dist/js/', filter: 'isFile'},
                    {cwd: 'node_modules/jquery/dist/', expand: true, src: ['*.js'], dest: 'dist/lib/jquery/js', filter: 'isFile'},
                    {cwd: 'node_modules/bootstrap/dist/', expand: true, src: ['**/*'], dest: 'dist/lib/bootstrap', filter: 'isFile'}
                ]
            }
        },

        // Configure a grunt-mocha-test task
        mochacli: {
            test: {
                options: {
                    reporter: '<%= mochacliConfig.reporter %>',
                    ui: '<%= mochacliConfig.ui %>',
                    colors: '<%= mochacliConfig.colors %>'
                },
                src: ['specs/**/*.js']
            }
        }



    });

    // Define the default task
    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'mochacli']);
};