"use strict";

module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-watchify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	
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
		
		watchify: {
			options: {
				watch: true,
				keepAlive: true
			},
			script: {
				src: './_assets/js/script.js',
				dest: './main.js'
			}

		},

		jshint: {
			options : {

			},
 		   
			all: ['./_assets/js/**/*.js']
		},
		
		watch : {
			css : {
				files: ['_assets/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},

			js: {
				files: ['./_assets/js/**/*.js'],
				tasks: ['watchify']
			},

			auto: {
				files : ['style.css'],
				tasks : ['autoprefixer']
			}

		},

		uglify: {
 			 options: {},
  		dist: {
    		files: {
      			'./main_minified.js': ['./main.js']
    			}
  			}
		},
		cssmin: {
  			add_banner: {
    			options: {
      				banner: ''
    			},
    			files: {
      			'css/style.min.css': ['css/style.css']
    		}
  		}
	}
		
	});
	
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('dev',['watch', 'watchify']);
	grunt.registerTask('default',['watch', 'watchify']);
	
}