const del = require('del');
const gulp = require('gulp');
const html_minifier = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const { spawn } = require('child_process');
const { mkdirp } = require('fs-extra');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', build);
gulp.task(assets);
gulp.task(build);
gulp.task(clean);
gulp.task(css);
gulp.task(html);
gulp.task(js);
gulp.task(watch);

function css() {
  return gulp
    .src('src/css/**/*.pcss', { since: gulp.lastRun(css) })
    .pipe(postcss())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('dist/css'));
}

function js() {
  return gulp
    .src('src/js/**/*.js', { since: gulp.lastRun(js) })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(terser({
      warnings: true,
      module: true,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}

function html() {
  return gulp
    .src('src/html/index.html', { since: gulp.lastRun(html) })
    .pipe(html_minifier({
      collapseWhitespace: true,
      decodeEntities: true,
      removeComments: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      collapseBooleanAttributes: true,
    }))
    .pipe(gulp.dest('dist'));
}

// Rather than blindly copying the files,
// let's use hard links to minimize space and improve performance.
async function assets() {
  await mkdirp('dist');
  return spawn('cp', ['-lR', 'src/assets', 'dist/assets']);
}

function clean() {
  return del('dist');
}

async function watch() {
  await build();
  gulp.watch('src/css/**/*.pcss', css);
  gulp.watch('src/html/**/*.html', html);
  gulp.watch('src/js/**/*.js', js);
  gulp.watch('src/assets/**/*', assets);
}

async function build() {
  await clean();
  return Promise.all([
    html(),
    js(),
    css(),
    assets(),
  ]);
}
