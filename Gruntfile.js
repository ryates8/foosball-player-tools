'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CONFIG ===================================/
        concurrent: {
            dev: ['sass:dev', 'concat', 'nodemon:dev', 'watch'],
            debug: ['sass:dev', 'concat', 'nodemon:debug', 'open:debug', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    /** Environment variables required by the NODE application **/
                    env: {
                        'NODE_ENV': 'development',
                        'NODE_CONFIG': 'dev'
                    },
                    delay: 300,

                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        /** Open the application in a new browser window and is optional **/
                        nodemon.on('config:update', function() {

                            // Delay before server listens on port

                            setTimeout(function() {
                                console.log('Starting the server');
                                require('open')('http://127.0.0.1:3000');
                            }, 1000);
                        });

                        /** Update .rebooted to fire Live-Reload **/
                        nodemon.on('restart', function() {
                            // Delay before server listens on port

                            setTimeout(function() {
                                console.log('Restarting Node');
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            },
            debug: {
                script: 'bin/www',
                options: {
                    /** Environment variables required by the NODE application **/
                    env: {
                        'NODE_ENV': 'development',
                        'NODE_CONFIG': 'dev'
                    },
                    nodeArgs: ['--inspect'],
                    delay: 300,
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        /** Open the application in a new browser window and is optional **/
                        nodemon.on('config:update', function() {

                            // Delay before server listens on port

                            setTimeout(function() {
                                console.log('Starting the server');
                                require('open')('http://127.0.0.1:5858');
                                setTimeout(function() {
                                    require('open')('http://127.0.0.1:8080/?port=5858');
                                }, 2000);
                            }, 2000);
                        });

                        /** Update .rebooted to fire Live-Reload **/
                        nodemon.on('restart', function() {
                            // Delay before server listens on port

                            setTimeout(function() {
                                console.log('Restarting Node');
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1500);
                        });
                    }
                }
            }
        },
        express: {
            debug: {
                options: {
                    script: 'bin/www',
                    node_env: 'development',
                    debug: true
                }
            },
        },
        exec: {
            debug: {
                command: 'node-inspector',
            }
        },
        copy: {
            prod: {
                files: [{
                    expand: true,
                    src: [
                        'app.js',
                        'database/**',
                        'package.json',
                        'bin/**',
                        'services/**',
                        'public/**',
                        'routes/**',
                        'views/**'
                    ],
                    dest: 'prod_files/'
                }]
            }
        },
        uglify: {
            prod: {
                options: {
                    mangle: true,
                    compress: true,
                    sourceMap: false,
                    drop_console: true
                },
                files: {
                    'public/javascripts/main.min.js': 'public/javascripts/main.min.js'
                }
            }
        },

        concat: {
            options: {
                separator: '\n',
            },
            basic: {
                src: [
                    'public/javascripts/libs/*.js',
                    'node_modules/foundation-sites/dist/js/foundation.js',
                    'public/javascripts/scripts/*.js'
                ],
                dest: 'public/javascripts/main.min.js',
            }
        },


        sass: { // Task
            dev: { // Target
                options: { // Target options
                    style: 'expanded',
                    sourcemap: 'none',
                    loadPath: ['node_modules/foundation-sites/scss']
                },
                files: { // Dictionary of files
                    'public/stylesheets/app.css': ['scss/app.scss'] // 'destination': 'source'
                }
            },
            prod: {
                options: { // Target options
                    style: 'compressed',
                    sourcemap: 'none',
                    loadPath: ['node_modules/foundation-sites/scss']
                },
                files: { // Dictionary of files
                    'public/stylesheets/app.css': ['scss/app.scss'] // 'destination': 'source'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['public/javascripts/**/*.js', '!public/javascripts/main.min.js'],
                tasks: ['concat']
            },
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dev']
            },
            jade: {
                files: 'views/**/*.jade',
                tasks: ['sass:dev']
            },
            reload: {
                files: ['public/stylesheets/app.css', 'public/javascripts/main.min.js']
            },
            web: {
                files: [
                    'routes/**/*.js',
                    'app.js',
                    'Gruntfile.js'
                ],
                options: {
                    debounceDelay: 250,
                }
            }
        },
        open: {
            debug: {
                path: 'http://127.0.0.1:3000',
                app: 'Google Chrome'
            },
            inspector: {
                path: 'http://127.0.0.1:8080/?port=5858',
                app: 'Google Chrome'
            }
        },
        imageoptim: {
            prod: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['public/images/**']
            }
        },
        compress: {
            prod: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    { cwd: 'prod_files/', src: ['**'], dest: 'bpm/' }, // includes files in path and its subdirs
                ]
            }
        }
    });
    // DEPENDENT PLUGINS =========================/
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-compress');
    // TASKS =====================================/

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('debug', ['concurrent:debug']);
    grunt.registerTask('prod', ['concat', 'sass:prod', 'uglify:prod', 'imageoptim:prod', 'copy:prod']);
    grunt.registerTask('publish', ['concat', 'sass:prod', 'uglify:prod', 'copy:prod', 'compress:prod']);
};
