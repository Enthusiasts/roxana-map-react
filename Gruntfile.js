/**
 * Created by debal on 25.02.2016.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bower: {
            dev: {
                dest: "public/vendor/",
                options: {
                    expand: true,
                    packageSpecific: {
                        bootstrap: {
                            files: ['dist/**']
                        },
                        'bootstrap-switch':{
                            files: ['dist/**']
                        },
                        pure: {
                            files: ['pure.css']
                        },
                        'font-awesome': {
                            files: ['fonts/**', 'css/**']
                        },
                        leaflet: {
                            files: ['dist/images/**', 'dist/leaflet.css']
                        },
                        'leaflet.locatecontrol': {
                            files: ['dist/**']
                        }
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower');

    grunt.registerTask('default', ['bower']);
};