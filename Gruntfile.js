'use strict';
module.exports = function(grunt) {

grunt.initConfig({
	compass: {
		dist: {
			options: {
				config: 'src/config.rb',
				sassDir: 'src/sass',
				cssDir: 'production/css',
				environment: 'production'
			}
		}
	},

	autoprefixer: {
		options: {
			 browsers: ['last 3 version', 'ie >= 8']
		},
		global: {
			src: 'production/css/*.css'
		},
	},

	copy: {
		img: {
			files: [
				{expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img/'}
			]
		},
		js: {
			files: [
				{expand: true, cwd: 'src/js/', src: ['**'], dest: 'production/js/'}
			]
		}
	},

	includereplace: {
		dist: {
			files: [
				{src: '*.html', dest: 'production/', expand: true, cwd: 'src/'},
			]
		}
	},

	clean: {
		html: ["production/_*.html"],
		release: ["production"],
	},

	csso: {
		dynamic_mappings: {
			expand: true,
			cwd: 'production/css/',
			src: ['*.css', '!*.min.css'],
			dest: 'production/css/',
			ext: '.min.css'
		}
	},

	watch: {
		scss: {
			files: 'src/sass/**/*.scss',
			tasks: ['compass', 'autoprefixer'],
		},
		js: {
			files: 'src/js/*.js',
			tasks: ['copy:js'],
		},
		html: {
			files: 'src/*.html',
			tasks: ['includereplace', 'clean:html'],
		},
		img: {
			files: 'src/img/**',
			tasks: ['copy:img'],
		}
	},
});
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask( 'default', ['watch']);
	grunt.registerTask( 'release', ['clean:release', 'copy',
									'includereplace', 'clean:html',
									'compass', 'autoprefixer', 'csso']);

};