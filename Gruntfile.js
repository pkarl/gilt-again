/*global module:false */

'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

	// set up config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		env: {
			dev: {
				NODE_ENV: 'dev',
				DEST: 'dev'
			},
			dist: {
				NODE_ENV: 'dist',
				DEST: 'dist'
			}
		},

		compass: {
			dist: {}
		},

		watch: {
			scripts: {
				files: ['src/app/style/sass/*.scss','src/app/templates/jsx/*.jsx'],
				tasks: ['compass', 'react', 'preprocess', 'copy'],
				options: {
					debounceDelay: 500,
					nonull: true
				}
			}
		},

		react: {
			app: {
				options: {
					extension: 'jsx',
					ignoreMTime: false
				},
				files: {
					'src/app/js': 'src/app/templates/jsx'
				}
			},
		},

		preprocess: {
			dev: {
				src: './src/app/templates/tmpl.index.html',
				dest: './dev/index.html'
			}
		},

		copy: {
			dev: {
				files: [{
					expand: true,
					cwd: 'components/',
					src: ['**'],
					dest: './dev/components/'
				}, {
					expand: true,
					cwd: 'src/app/style/css/',
					src: ['*'],
					dest: './dev/css/'
				}, {
					expand: true,
					cwd: 'src/app/js/',
					src: ['*.js'],
					dest: './dev/js/'
				}]
			}
		},

		// DIST only - pk
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

	grunt.registerTask('default', ['env:dev', 'compass', 'react', 'preprocess', 'copy', 'watch']);

};