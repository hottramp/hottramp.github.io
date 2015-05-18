// Per machine: Run npm install -g grunt-cli
// Per project: npm install --save-dev

// to-do: break out tasks into individual files


module.exports = function(grunt) {

    // ===========================================================================
    // Load plugins
    //
    // Declared in package.json
    // See: https://github.com/sindresorhus/load-grunt-tasks
    //
    // ===========================================================================

    require('load-grunt-tasks')(grunt);


    // ===========================================================================
    // Configure Grunt
    //
    // Get the configuration info from package.json
    // This way we can use things like name and version (pkg.name)
    // ===========================================================================

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Validate JS
        // ===========================================================================

        jshint: {
            options: {
                // use jshint-stylish to make our errors look and read good
                // See: https://github.com/sindresorhus/jshint-stylish
                // npm install --save-dev jshint-stylish
                reporter: require('jshint-stylish')
            },

            target: ['src/js/*.js'],

            // when this task is run, lint the Gruntfile and all js files in src. ** denotes all folders
            build: ['gruntfile.js', 'src/js/*.js']
        },


        // Concat JS files
        // ===========================================================================

        concat: {
            options: {
                //separator: ';'
            },

            dist: {
                // ensuring jquery.load.js is done last
                src: [
                    'src/js/*.js',
                    '!src/js/jquery.load.js',
                    'src/js/helpers/*.js',
                    'src/js/jquery.load.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },


        // Minify the concatenated JS file
        // ===========================================================================

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: true
            },

            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },


        // Compile CSS
        // ===========================================================================

        less: {
            options: {
                sourceMap: true,
                outputSourceFiles: true,
                sourceMapURL: 'dist/css/<%= pkg.name %>.css.map',
                sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
            },

            build: {
                files: {
                    'dist/css/<%= pkg.name %>.css': 'src/less/style.less'
                }
            }
        },


        // Autoprefix CSS
        // ===========================================================================

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },

            dist: {
                files: {
                    'dist/css/<%= pkg.name %>.css': 'dist/css/<%= pkg.name %>.css'
                }
            }
        },


        // Minify CSS
        // ===========================================================================

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                zeroUnits: true
            },

            build: {
                files: {
                    'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        },


        // Watch
        // ===========================================================================

        watch: {
            options: {
                // ===========================================================================
                // livereload requires browser plugin and desktop app
                //
                // See: http://feedback.livereload.com/knowledgebase/articles/67441-how-do-i-start-using-livereload
                // https://github.com/gruntjs/grunt-contrib-watch#optionslivereload
                //
                // ===========================================================================

                livereload: 1337,
            },

            // for stylesheets, watch CSS and LESS files
            css: {
                files: ['src/**/*.less', 'dist/css/*.css'],
                tasks: ['less', 'autoprefixer', 'cssmin'],
            },

            // for scripts, run concat and uglify
            js: {
                files: 'src/js/*.js',
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });


    // Default task
    // ===========================================================================

    grunt.registerTask('default', ['concat', 'uglify', 'less', 'autoprefixer', 'cssmin']);

};
