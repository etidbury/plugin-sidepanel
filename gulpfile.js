var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    gutil = require('gutil'),
    babel = require('babelify'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    react = require('gulp-react'),
    path = require('path'),
    concat = require('gulp-concat'),
    glob = require('glob'),
    image = require('gulp-image'),
    cssmin = require('gulp-cssmin')
    ;

var config = {};
config.srcURI = './src/';
config.distURI = './dist/';

config.indexPageName = 'index.html';
config.fontsURI = config.srcURI + 'fonts/';
config.jsURI = config.srcURI + 'js/';
config.imgURI = config.srcURI + 'img/';
config.sassURI = config.srcURI + 'sass/';
config.sassDefaultFile = config.sassURI + 'default.scss';
config.jsDefaultFileName = 'default.js';
config.outputJSDefaultFileName = 'bundle.min.js';
config.jsDefaultFile = config.jsURI + config.jsDefaultFileName;

config.outputCSSURI = config.distURI + 'css/';
config.outputJSURI = config.distURI + 'js/';
config.outputImgURI = config.distURI + 'img/';
config.babelPresets = ['es2015', 'babel-preset-react'];
config.babelPlugins = [
    'react-html-attrs'
    , 'transform-class-properties'
    , 'transform-decorators-legacy'
    , "transform-react-jsx"
];

config.resourceManagerURI = './node_modules/';


gulp.task('icons', function () {
    return gulp.src([
        config.fontsURI + '**.*',
        config.resourceManagerURI + 'font-awesome/fonts/**.*',
        config.resourceManagerURI + 'bootstrap-sass/assets/fonts/bootstrap/**.*'
    ])
        .pipe(gulp.dest(config.fontsURI));
});

//distribute sass and minify and add livereload handler
gulp.task('css', function () {
    return gulp.src([
        config.sassDefaultFile,
    ])
        .pipe(sourcemaps.init())
        .pipe(
            sass().on("error", notify.onError(function (error) {
                    return "Error: " + error.message;
                })
            )
        )
        .pipe(sourcemaps.write('/'))
        .pipe(cssmin())
        .pipe(gulp.dest(config.outputCSSURI))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    var jsFiles = glob.sync(config.jsURI + '**/*.*');

    var bundler = browserify({
        entries: [
            jsFiles
            , config.jsDefaultFile
        ], // main js file and files you wish to bundle
        extensions: [' ', 'js', 'jsx'],
        paths: [config.resourceManagerURI, config.jsURI]
    }).transform(babel.configure({
        presets: config.babelPresets //sets the preset to transpile to es2015 (you can also just define a .babelrc instead)
        , plugins: config.babelPlugins
    }));

    // bundler is simply browserify with all presets set
    return bundler.bundle()
        .on("error", notify.onError(function (error) {
            console.error(error);
            return "Error: " + error.message;
        }))
        .pipe(source(config.jsDefaultFileName)) // main source file
        .pipe(buffer())
        .pipe(react())
        .pipe(sourcemaps.init({loadMaps: true})) // create sourcemap before running edit commands so we know which file to reference
        .pipe(uglify({mangle: false})) //minify file without mangling names
        .pipe(rename(config.outputJSDefaultFileName)) // rename file
        .pipe(sourcemaps.write('/', {sourceRoot: config.jsURI})) // sourcemap gets written and references wherever sourceRoot is specified to be
        .pipe(gulp.dest(config.outputJSURI));

});

//distribute images with optional image compression
gulp.task('image', function () {
    return gulp.src(config.imgURI + '**/*.*')
        .pipe(image({
            pngquant: false,
            optipng: false,
            zopflipng: false,
            jpegRecompress: false,
            jpegoptim: false,
            mozjpeg: false,
            gifsicle: false,
            svgo: false,
            concurrent: 10
        }))
        .pipe(gulp.dest(config.outputImgURI));
});

//delete all files and folders in dist
gulp.task('clean:dist', function () {
    return del.sync([
        config.distURI + '**/*'
    ]);
});

//add livereload handler to index page
gulp.task('html', function () {
    return gulp.src(config.indexPageName)
        .pipe(connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function () {

    gulp.watch(config.sassURI + '**/*.scss', ['css']);
    gulp.watch(config.jsURI + '**/*.*', ['js']);
    gulp.watch(config.imgURI + '**/*.*', ['image']);
    gulp.watch(config.indexPageName, ['html']);

});

//init livereload server
gulp.task('connect', function () {

    connect.server({
        livereload: true
    });

});


gulp.task('default', ['icons', 'css', 'js', 'image', 'watch', 'connect']);