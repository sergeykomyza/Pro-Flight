const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const del = require('del');

// Таск для сборки pug файлов
gulp.task('pug', function (callback) {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Pug',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
    callback();
});

// Компиляция sass в css
gulp.task('sass', function (callback) {
    return gulp.src('./src/sass/*.sass')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream())

    callback();
});

// Следим за файлами
gulp.task('watch', function () {

    // Следим за картинками и скриптами и обновляем браузер
    watch(['./build/js/**/*.*', './build/img/**/*.*'], gulp.parallel(browserSync.reload));

    // Слежение за sass и компиляция в css 
    // watch('./src/sass/**/*.sass', gulp.parallel('sass'))

    // Запуск слежения и компиляции SCSS с задержкой, для жесктих дисков HDD
	watch('./src/sass/**/*.sass', function(){
		setTimeout( gulp.parallel('sass'), 1000 )
	})

    // Слежение за PUG и сборка
    watch('./src/pug/**/*.pug', gulp.parallel('pug'))

    // Следим за шрифтами, картинками и скриптами, и копируем их в build
    watch('./src/fonts/**/*.*', gulp.parallel('copy:fonts'))
    watch('./src/img/**/*.*', gulp.parallel('copy:img'))
    watch('./src/js/**/*.*', gulp.parallel('copy:js'))
});

// Копирование Шрифтов
gulp.task('copy:fonts', function (callback) {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts/'))
    callback();
});

// Копирование Изображений
gulp.task('copy:img', function (callback) {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img/'))
    callback();
});

// Копирование Скриптов
gulp.task('copy:js', function (callback) {
    return gulp.src('./src/js/**/*.*')
        .pipe(gulp.dest('./build/js/'))
    callback();
});

// Копирование CSS (библиотеки)
gulp.task('copy:css', function (callback) {
    return gulp.src('./src/css/**/*.*')
        .pipe(gulp.dest('./build/css/'))
    callback();
});

// Старт сервера из папки app
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task('clean:build', function () {
    return del('./build')
});


// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task(
    'default',
    gulp.series(
        gulp.parallel('clean:build'),
        gulp.parallel('sass', 'pug', 'copy:fonts', 'copy:img', 'copy:js', 'copy:css'),
        gulp.parallel('server', 'watch'),
    )
);