"use strict";

module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		
		sass : {
			dist : {
				options : {
					style : 'expanded'
				},
				files : {
					'css/style.css' : '_assets/scss/style.scss'
				}
			}
		},
		
		autoprefixer: {
			single_file : {
				options: {
				      // Task-specific options go here.
				},
				prefix : {
					options: {
					        // Target-specific options go here.
					      },
					file: 'css/style.css',
					dest: 'css/style.css'
				}
			}			
		},
		
		watch : {
			css : {
				files: ['_assets/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},

			js: {
				files: ['js/modules/**/*.js'],
				tasks: ['watchify', 'jshint']
			},

			auto: {
				files : ['style.css'],
				tasks : ['autoprefixer']
			}

		},
		
	});
	
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('css-dev',['watch']);
}