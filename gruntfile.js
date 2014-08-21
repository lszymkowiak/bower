module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: ["public/*"],
        },

        bower: {
            install: {
                options: {
                    cleanTargetDir: true,
                    targetDir: './bower_components',
                    bowerOptions: {
                        forceLatest: true,
                        production: true,
                    }
                }
            }
        },

        copy: {
            jquery: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            angular: {
                files: [
                    {expand: true, cwd: 'bower_components/angular/', src: ['angular.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            bootstrap: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['bootstrap.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: ['bootstrap.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'public/fonts/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/bootstrap/less/', src: ['**'], dest: 'public/css/less/', filter: 'isFile'},
                ]
            },

            fontawesome: {
                files: [
                    {expand: true, cwd: 'bower_components/fontawesome/css/', src: ['font-awesome.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/fontawesome/fonts/', src: ['**'], dest: 'public/fonts/', filter: 'isFile'},
                ]
            },

            holder: {
                files: [
                    {expand: true, cwd: 'bower_components/holderjs/', src: ['holder.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            jquery_cycle: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery-cycle2/build/', src: ['jquery.cycle2.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            lightbox: {
                files: [
                    {expand: true, cwd: 'bower_components/lightbox/js/', src: ['lightbox.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/css/', src: ['lightbox.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/img/', src: ['close.png', 'loading.gif', 'next.png', 'prev.png'], dest: 'public/gfx/lightbox/', filter: 'isFile'},
                ]
            }
        },

        rename: {
            fontawesome: {
                files: [
                    {src: ['public/css/font-awesome.css'], dest: 'public/css/fontawesome.css'},
                ]
            },

            jquery_cycle: {
                files: [
                    {src: ['public/js/jquery.cycle2.js*'], dest: 'public/js/jquery-cycle2.js'},
                ]
            },
        },

        replace: {
            bootstrap: {
                src: ['public/css/bootstrap.css'],
                dest: 'public/css/bootstrap.css',
                replacements: [
                    {
                        from:   '/*# sourceMappingURL=bootstrap.css.map */',
                        to:     ''
                    },
                ]
            },

            lightbox_js: {
                src: ['public/js/lightbox.js'],
                dest: 'public/js/lightbox.js',
                replacements: [
                    {
                        from:   'return "Image " + curImageNum + " of " + albumSize;',
                        to:     'return curImageNum + " / " + albumSize;'
                    },
                ]
            },

            lightbox_css: {
                src: ['public/css/lightbox.css'],
                dest: 'public/css/lightbox.css',
                replacements: [
                    {
                        from:   '../img/',
                        to:     '../gfx/lightbox/'
                    },
                ]
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'public/js/',
                    ext: '.min.js'
                }]
            },
        },

        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css/',
                    ext: '.min.css'
                }]
            },
        },

    });

    // update
    grunt.registerTask('update', ['clean']);

    // jquery
    grunt.registerTask('jquery', ['copy:jquery']);

    // angular
    grunt.registerTask('angular', ['copy:angular']);

    // bootstrap
    grunt.registerTask('bootstrap', ['copy:bootstrap', 'replace:bootstrap']);

    // fontawesome
    grunt.registerTask('fontawesome', ['copy:fontawesome', 'rename:fontawesome']);

    // holder
    grunt.registerTask('holder', ['copy:holder']);

    // cycle
    grunt.registerTask('cycle', ['copy:jquery_cycle', 'rename:jquery_cycle']);

    // lightbox
    grunt.registerTask('lightbox', ['copy:lightbox', 'replace:lightbox_js', 'replace:lightbox_css']);

    // min
    grunt.registerTask('min', ['uglify', 'cssmin']);

    // default
    grunt.registerTask('default', [
        'bower',
        'clean',
        'jquery',
        'angular',
        'bootstrap',
        'fontawesome',
        'holder',
        'cycle',
        'lightbox',
        'min'
    ]);



};
