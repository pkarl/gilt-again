/*global module:false */

'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-browserify');

	// set up config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {}
		},

		watch: {
			scripts: {
				files: ['src/app/style/sass/*.scss','src/app/templates/jsx/*.jsx'],
				tasks: ['compass', 'react'],
				options: {
					debounceDelay: 500,
					nonull: true
				}
			}
		},

		react: {
			app: {
				options: {
					extension: 'js',
					ignoreMTime: false
				},
				files: {
					'src/app/js': 'src/app/templates/jsx'
				}
			},
		},

		browserify: {
			options: {
				transform: [require('grunt-react').browserify]
			},
			app: {
				src: 'src/app/js/main.js',
				dest: 'src/app/js/built.js'
			}
		}

	});

	grunt.registerTask('default', ['compass', 'react', 'watch']);

};