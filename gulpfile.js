const
    gulp = require(`gulp`),
    print = require(`gulp-print`),
    plumber = require(`gulp-plumber`),
    concat = require(`gulp-concat`),
    order = require(`gulp-order`),
    mainBowerFiles = require(`main-bower-files`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`).create(),
    reload = browserSync.reload;

// add in a .pipe(`print`) if you`re having troubles with files concating in the wrong order
// this will let you see what order things are happening in and debug your problem

gulp.task(`server`, () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: `./dist`
        }
    });
});

gulp.task(`css`, () => {
    return gulp.src(mainBowerFiles(`**/*.css`).concat([`src/**/*.css`]))
        .pipe(plumber())
        .pipe(order([
            `**/normalize.css`, `**/*.css`
        ]))
        .pipe(concat(`css.css`))
        .pipe(gulp.dest(`./dist/all`))
        .pipe(reload({
            stream: true,
            match: `**/*.css`
        }));
});

gulp.task(`js`, () => {
    return gulp.src(mainBowerFiles(`**/*.js`).concat([`src/**/*.js`]))
        .pipe(plumber())
        .pipe(order([
            `**/angular.js`, `**/angular-ui-router.js`, `**/app.js`, `**/*.js`
        ]))
        .pipe(babel({
            presets: [`es2015`],
            "only": [
                `src/**/*.js`,
                `src/*.js`
            ]
        }))
        .pipe(concat(`js.js`))
        .pipe(gulp.dest(`./dist/all`))
        .on(`end`, reload);
});

gulp.task(`index`, () => {
    return gulp.src(`src/index.html`)
        .pipe(gulp.dest(`./dist`))
        .on(`end`, reload);
});

gulp.task(`html`, () => {
    return gulp.src([`src/**/*.html`, `!src/index.html`])
        .pipe(gulp.dest(`./dist/views`))
        .on(`end`, reload);
});

gulp.task(`watch`, () => {
    gulp.watch(`src/**/*.css`, [`css`]);
    gulp.watch(`src/**/*.js`, [`js`]);
    gulp.watch([`src/**/*.html`, `!src/index.html`], [`html`]);
    gulp.watch(`src/index.html`, [`index`]);
});

gulp.task(`default`, [`css`, `js`, `html`, `index`, `watch`, `server`]);

//other good tasks

// uglify (requires gulp-ng-annotate for use with angular)
// css minification
// less, sass, or stylus
// gulp-sourcemaps
// incremental building (https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md)
// connect-history-api-fallback for html5 mode routing with angular and browsersync
// gulp-flatten to remove folder structure
// autoprefixer, do-i-use