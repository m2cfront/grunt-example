module.exports = function(grunt){

	// Grunt Configure
	grunt.initConfig({

		// Use "pkg" to fetch "package.json"
		pkg: grunt.file.readJSON('package.json'),

		// Concatenate files
		concat: {
			options: {
				banner: '/* ! <%= pkg.name %> - <%= pkg.version %> */'				
			},
			// Define files' path
			example: {
				src: [
					'src/intro.js',
					'src/source.js',
					'src/outro.js'
				],
				dest: 'dist/example.debug.js'
			}
		},

		jshint: {
    		beforeconcat: ['src/source.js'],
    		afterconcat: ['dist/example.debug.js']
  		},

		// Uglify files
		uglify: {
			options: {
				banner: '/* ! <%= pkg.name %> - <%= pkg.version %> - min */'				
			},
			example: {
				files: {
					'dist/example.min.js': ['dist/example.debug.js']
				}
			}
		},

		// Use YUIDOC to create documents
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				options: {
					paths: 'dist/',
					outdir: 'docs/'
				}
			}
		},

		// Use Qunit to test
		qunit: {
			all: ['test/test.html']
		},

		// Compile less
		less: {
			production: {
				options: {
					paths: ['assets/css'],
					yuicompress: true
				},
				files: {
					"assets/css/style.css": 'assets/less/index.less'
				}
			}
		},

		// Watch, for change files in time
		watch: {
			src: {
				files: ['src/*.js', 'assets/less/*.less'],
				tasks: ['default']
			}
		}
	});
	
	// Should use 'npm' to install dependencies first
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'yuidoc', 'qunit', 'less']);

	grunt.event.on('watch', function(action, filepath){
		grunt.log.writeln(filepath + ' has ' + action);
	});
}