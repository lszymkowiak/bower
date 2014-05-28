module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: ["public/*"]
        },

        run_grunt: {
            options: {
                minimumFiles: 1,
            },
            jquery_ui: {
                options: {
                    log: true,
                },
                src: ['gruntfile-jquery-ui.js']
            },
        },

        copy: {
            jquery: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            jquery_cycle: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery-cycle2/build/', src: ['jquery.cycle2.js'], dest: 'public/js/', filter: 'isFile'},
                ]
            },

            jquery_ui: {
                files: [
                    {expand: true, cwd: 'bower_components/jquery.ui/dist/', src: ['jquery-ui.js', 'jquery-ui-i18n.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/jquery.ui/dist/', src: ['jquery-ui.css', 'jquery-ui.min.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/jquery.ui/dist/gfx/', src: ['**'], dest: 'public/gfx/ui/', filter: 'isFile'},
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

            lightbox: {
                files: [
                    {expand: true, cwd: 'bower_components/lightbox/js/', src: ['lightbox.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/css/', src: ['lightbox.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/lightbox/img/', src: ['close.png', 'loading.gif', 'next.png', 'prev.png'], dest: 'public/gfx/lightbox/', filter: 'isFile'},
                ]
            },

            supersized: {
                files: [
                    {expand: true, cwd: 'bower_components/supersized/core/js/', src: ['supersized.core.3.2.1.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/supersized/core/css/', src: ['supersized.core.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/supersized/core/img/', src: ['bg-black.png', 'progress.gif', 'supersized-logo.png'], dest: 'public/gfx/supersized/', filter: 'isFile'},
                ]
            },

            fontawesome: {
                files: [
                    {expand: true, cwd: 'bower_components/fontawesome/css/', src: ['font-awesome.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/fontawesome/fonts/', src: ['**'], dest: 'public/fonts/', filter: 'isFile'},
                ]
            },

            uploadify: {
                files: [
                    {expand: true, cwd: 'bower_components/uploadify/', src: ['jquery.uploadify.js'], dest: 'public/js/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/uploadify/', src: ['uploadify.css'], dest: 'public/css/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/uploadify/', src: ['uploadify-cancel.png'], dest: 'public/gfx/uploadify/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/uploadify/', src: ['uploadify.swf'], dest: 'public/gfx/uploadify/', filter: 'isFile'},
                ]
            },
        },

        rename: {
            jquery_cycle: {
                files: [
                    {src: ['public/js/jquery.cycle2.js*'], dest: 'public/js/jquery-cycle2.js'},
                ]
            },

            supersized: {
                files: [
                    {src: ['public/js/supersized.*'], dest: 'public/js/supersized.js'},
                    {src: ['public/css/supersized.*'], dest: 'public/css/supersized.css'},
                ]
            },

            uploadify: {
                files: [
                    {src: ['public/js/jquery.uploadify.js'], dest: 'public/js/jquery-uploadify.js'},
                ]
            }
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
            },


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

            uploadify: {
                src: ['public/css/uploadify.css'],
                dest: 'public/css/uploadify.css',
                replacements: [
                    {
                        from:   '../img/',
                        to:     '../gfx/uploadify/'
                    },
                ]
            },
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
                    dest: 'public/js/min/',
                    ext: '.min.js'
                }]
            },
        },

    });

    grunt.registerTask('default', [
        'clean',

        // jquery
        'copy:jquery',

        // jquery_cycle
        'copy:jquery_cycle',
        'rename:jquery_cycle',

        // // jquery_ui
        'run_grunt:jquery_ui',
        'copy:jquery_ui',

        // bootstrap
        'copy:bootstrap',
        'replace:bootstrap',

        // lightbox
        'copy:lightbox',
        'replace:lightbox_js',
        'replace:lightbox_css',

        // supersized
        'copy:supersized',
        'rename:supersized',
        'replace:supersized',

        // fontawesome
        'copy:fontawesome',

        // uploadify
        'copy:uploadify',
        'rename:uploadify',
        'replace:uploadify',

        // uglify
        'uglify:all',
    ]);

};
