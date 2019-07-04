/* eslint-env node */

const del = require('del');
const gulp = require('gulp');
const html_minifier = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const { spawn } = require('child_process');
const { mkdirp } = require('fs-extra');
const { rollup } = require('rollup');
const pug = require('gulp-pug');

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
    .src('src/css/interface.sss', { since: gulp.lastRun(css) })
    .pipe(postcss())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('dist/css'));
}

async function js() {
  const bundle = await rollup(require('./rollup.config.js'));

  await bundle.write({
    dir: './dist/js',
    format: 'esm',
    sourcemap: true,
  });
}

function html() {
  return gulp
    .src('src/html/index.pug', { since: gulp.lastRun(html) })
    .pipe(pug({ doctype: 'html' }))
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
  gulp.watch(['src/css/**/*.pcss', 'src/css/**/*.sss'], css);
  gulp.watch('src/html/**/*.pug', html);
  gulp.watch(['src/js/**/*.js', 'src/js/**/*.jsx', 'src/css/**/*.pcss', 'src/css/**/*.sss'], js);
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
