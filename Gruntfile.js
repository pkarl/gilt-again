/*global module:false */

'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// set up config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {
				// options: {
				// 	config: 'config.rb'
				// }
			}
		},

		watch: {
			scripts: {
				files: ['src/app/style/sass/*.scss'],
				tasks: ['default'],
				options: {
					debounceDelay: 1000,
					nonull: true
				}
			},
		},

	});

	grunt.registerTask('default', ['compass', 'watch']);

};