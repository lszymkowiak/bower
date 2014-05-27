module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["public/"],

        copy: {
            build: {
                files: [
                    // jquery
                    {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: 'public/js/', filter: 'isFile'},

                    // bootstrap
                    {expand: true, cwd: 'bower_components/bootstrap/less/', src: ['**'], dest: 'public/less/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['bootstrap.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: ['bootstrap.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'public/fonts/', filter: 'isFile'},

                    // lightbox
                    {expand: true, cwd: 'bower_components/lightbox/js/', src: ['lightbox.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/css/', src: ['lightbox.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/img/', src: ['close.png', 'loading.gif', 'next.png', 'prev.png'], dest: 'public/gfx/lightbox/', filter: 'isFile'},

                    // supersized
                    {expand: true, cwd: 'bower_components/supersized/core/js/', src: ['supersized.core.3.2.1.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/supersized/core/css/', src: ['supersized.core.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/supersized/core/img/', src: ['bg-black.png', 'progress.gif', 'supersized-logo.png'], dest: 'public/gfx/supersized/', filter: 'isFile'},

                    // fontello
                    {expand: true, cwd: 'fontello/font/', src: ['**'], dest: 'public/fonts/', filter: 'isFile'},
                    {expand: true, cwd: 'fontello/css/', src: ['fontello.css'], dest: 'public/css/', filter: 'isFile'},
                ]
            }
        },

        rename: {
            // supersized
            supersized: {
                files: [
                    {src: ['public/js/supersized.*'], dest: 'public/js/supersized.js'},
                    {src: ['public/css/supersized.*'], dest: 'public/css/supersized.css'},
                ]
            }
        },

        replace: {
            // lightbox
            lightbox: {
                src: ['public/css/lightbox.css'],
                dest: 'public/css/lightbox.css',
                replacements: [
                    {
                        from:   '../img/',
                        to:     '../gfx/lightbox/'
                    },
                ]
            },

            // supersized
            supersized : {
                src: ['public/css/supersized.css'],
                dest: 'public/css/supersized.css',
                replacements: [
                    {
                        from:   '../img/',
                        to:     '../gfx/supersized/'
                    },
                ]
            },

            // /fontello
            fontello: {
                src: ['public/css/fontello.css'],
                dest: 'public/css/fontello.css',
                replacements: [
                    {
                        from:   '../font/',
                        to:     '../fonts/'
                    },
                ]
            }
        }

    });

    grunt.registerTask('default', ['clean', 'copy', 'rename', 'replace']);

};
