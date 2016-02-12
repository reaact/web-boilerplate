'use strict';

module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		svg_sprite  : {
            basic   : {
                cwd                 : 'images/icons', // SVG icons source directory
                expand              : true,
                src                 : ['**/*.svg'],
                dest                : '.', // base directory

                options             : {
                	dest            : '.',
                    shape           : {
                        spacing     : {
                            padding : '1px'
                        },
                    },
                    mode            : {
                        css         : { 
                        	dest    : '.', // reset path to nothing from /css/
                            render  : {
                                scss: {
                                    template: 'css/production/component/_component.icon_template.mustache', // mustache template for scss output
                                    dest: 'css/production/component/_component.icon.scss' // directory for scss file
                                }
                            },
                            prefix  : " icon-",
                            sprite  : "images/icon-sprite.svg", // relative path to sprite, made absolute with backslash before it in mustache template
                        }
                    }
                }
            }
        },

		concat: {
			main: {
				src: ['js/production/*.js', '!js/production/libs/*.js', 'js/production/plugins/*.js'],
				dest: 'js/build/main.js' 
			}
		},
	
		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				}
			},
			target: {
				files: {
					'js/build/main.min.js': ['js/build/main.js']
				}
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded', debugInfo: true, lineNumbers: true,
				},
				files: {
					'css/build/main.min.css': 'css/production/main.scss'
				}
			},
			live: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/main.min.css': 'css/production/main.scss'
				}
			}
		},
	
		watch: {
			watchlive: {
				files: ['images/icons/*.svg','js/production/*.js','!js/production/libs/*.js','js/production/vendor/*.js', 'css/production/**'],
				tasks: ['svg_sprite','concat','uglify','sass:live'],
				options: {
					spawn: false,
				},
			},
			watchdev: {
				files: ['images/icons/*.svg','js/production/*.js','!js/production/libs/*.js','js/production/vendor/*.js', 'css/production/**'],
				tasks: ['svg_sprite','concat','uglify','sass:dev'],
				options: {
					spawn: false,
				},
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-svg-sprite');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default watcher
	grunt.registerTask('default', ['watch:watchdev']);
	
	// Live watcher
	grunt.registerTask('live', ['watch:watchlive']);
	
};