module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			ui: {
				src: ['bower_components/jquery.ui/ui/*.js'],
				dest: "bower_components/jquery.ui/dist/jquery-ui.js"
			},
			i18n: {
				src: ['bower_components/jquery.ui/ui/i18n/*.js'],
				dest: "bower_components/jquery.ui/dist/jquery-ui-i18n.js"
			},
			css: {
				src: [
					'bower_components/jquery.ui/themes/base/jquery.ui.core.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.accordion.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.autocomplete.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.button.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.datepicker.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.dialog.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.menu.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.progressbar.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.resizable.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.selectable.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.slider.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.spinner.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.tabs.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.tooltip.css',
					'bower_components/jquery.ui/themes/base/jquery.ui.theme.css',
				],
				dest: "bower_components/jquery.ui/dist/jquery-ui.css"
			}
		},

		replace: {
			css: {
				src: ['bower_components/jquery.ui/dist/jquery-ui.css'],
				dest: 'bower_components/jquery.ui/dist/jquery-ui.css',
				replacements: [
					{
						from:   'images/',
						to:     '../gfx/ui/'
					},
				]
			}
		},

		copy: {
			images: {
				files: [
					{expand: true, cwd: 'bower_components/jquery.ui/themes/base/images/', src: ['*'], dest: 'bower_components/jquery.ui/dist/gfx', filter: 'isFile'},
				]
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},

			ui: {
				files: { 'bower_components/jquery.ui/dist/jquery-ui.min.js': ['bower_components/jquery.ui/dist/jquery-ui.js'] }
			},

			i18n: {
				files: { 'bower_components/jquery.ui/dist/jquery-ui-i18n.min.js': ['bower_components/jquery.ui/dist/jquery-ui-i18n.js'] }
			}
		},

		cssmin: {
			css: {
				files: { 'bower_components/jquery.ui/dist/jquery-ui.min.css': [ 'bower_components/jquery.ui/dist/jquery-ui.css'] }
			}
		},

	});

	grunt.registerTask('default', ['concat', 'replace', 'copy', 'uglify', 'cssmin']);

};
