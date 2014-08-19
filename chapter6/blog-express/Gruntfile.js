/**
 * Created by darren on 8/7/14.
 */
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        mochacliConfig: grunt.file.readJSON("mochacli-config.json"),
        pathConfig: grunt.file.readJSON("path-config.json"),

        // Configure grunt-contrib-clean task
        clean: ["<%= pathConfig.dist %>/"],

        // Configure grunt-contrib-jshint task
        jshint: {
            options: {
                laxcomma: true
            },
            all: ['Gruntfile.js', '<%= pathConfig.specs %>/**/*.js', '<%= pathConfig.distJs %>/**/.js']
        },

        // Configure grunt-contrib-copy task
        copy: {
            main: {
                files: [
                    {cwd: '<%= pathConfig.src %>', expand: true, src: ['**/*.jade'], dest: '<%= pathConfig.dist %>', filter: 'isFile'},
                    {cwd: '<%= pathConfig.srcScripts %>', expand: true, src: ['**/*.*'], dest: '<%= pathConfig.distJs %>', filter: 'isFile'},
                    {cwd: '<%= pathConfig.srcPublic %>', expand: true, src: ['**/*'], dest: '<%= pathConfig.distPublic %>', filter: 'isFile'},
                    {cwd: '<%= pathConfig.nodeModules %>/jquery/dist/', expand: true, src: ['*'], dest: '<%= pathConfig.distPublicLib %>/jquery/js', filter: 'isFile'},
                    {cwd: '<%= pathConfig.nodeModules %>/bootstrap/dist/', expand: true, src: ['**/*'], dest: '<%= pathConfig.distPublicLib %>/bootstrap', filter: 'isFile'},
                    {cwd: '<%= pathConfig.srcDataCollection %>', expand: true, src: ['**/*.json'], dest: '<%= pathConfig.distDataCollection %>', filter: 'isFile'}
                ]
            }
        },

        // Configure a grunt-mocha-test task
        mochacli: {
            all: {
                options: {
                    reporter: '<%= mochacliConfig.reporter %>',
                    ui: '<%= mochacliConfig.ui %>',
                    colors: '<%= mochacliConfig.colors %>'
                },
                src: ['<%= pathConfig.specs %>/**/*.js']
            }
        },

        // Configure grunt-mongoimport
        mongoimport : {
            options: {
                db: 'blog',
                host: 'localhost',
                port: '27017',
                stopOnError: false,
                collections: [
                    {
                        name: 'users',
                        type: 'json',
                        file: '<%= pathConfig.distDataCollection %>/users.json',
                        jsonArray : true,
                        upsert : true,
                        drop : true
                    },
                    {
                        name: 'articles',
                        type: 'json',
                        file: '<%= pathConfig.distDataCollection %>/articles.json',
                        jsonArray : true,
                        upsert : true,
                        drop : true
                    }
                ]
            }
        }
    });


    // Define the default task
    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'mochacli']);
};