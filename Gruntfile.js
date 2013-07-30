module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/**/*.js'],
                dest: 'Gonfalon.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        qunit: {
            all: ['test/**/*.html']
        },
        uglify: {
            all: {
                files: {
                    'Gonfalon.min.js': ['src/**/*.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['jshint', 'qunit']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
