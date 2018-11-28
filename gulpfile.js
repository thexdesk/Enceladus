/* eslint-env node */

const commonjs = require('rollup-plugin-commonjs');
const del = require('del');
const gulp = require('gulp');
const html_minifier = require('gulp-htmlmin');
const node_resolve = require('rollup-plugin-node-resolve');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('gulp-better-rollup');
const run_sequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript');

const config = {
  css: {
    src_dir: 'src/css',
  },

  js: {
    src_dir: 'src/js',
    src_file: 'src/js/index.ts',
    out_file: 'modules.bundle.js',
  },

  html: {
    src_dir: 'src/html',
  },

  assets: {
    src_dir: 'src/assets',
    out_dir: 'assets',
  },

  out_dir: 'dist',
};

gulp.task('css', () => {
  return gulp
    .src(`${config.css.src_dir}/*.pcss`)
    .pipe(postcss())
    .pipe(rename({ extname: '.bundle.css' }))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('js', () => {
  return gulp
    .src(config.js.src_file)
    .pipe(sourcemaps.init())
    .pipe(rollup({
      plugins: [
        typescript(),
        node_resolve({
          jsnext: true,
          preferBuiltins: true,
          browser: true,
          extensions: ['.js', '.ts'],
        }),
        commonjs({
          extensions: ['.js', '.ts'],
        }),
        terser({
          compress: {
            booleans_as_integers: true,
            hoist_funs: true,
            keep_fargs: false,
            module: true,
            passes: 2,
            pure_getters: true,
            warnings: true,
          }
        }),
      ],
    }, {
      format: 'iife',
    }))
    .pipe(rename({ basename: 'modules', extname: '.bundle.js' }))
    .pipe(sourcemaps.write('.', { addComment: true }))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('html', () => {
  return gulp
    .src(`${config.html.src_dir}/*.html`)
    .pipe(html_minifier({
      collapseWhitespace: true,
      decodeEntities: true,
      removeComments: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      collapseBooleanAttributes: true,
    }))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('assets', () => {
  return gulp
    .src(`${config.assets.src_dir}/**/*`)
    .pipe(gulp.dest(`${config.out_dir}/${config.assets.out_dir}`));
});

gulp.task('clean', () => del('dist'));

gulp.task('watch', ['build'], () => {
  gulp.watch(`${config.css.src_dir}/**/*.pcss`, ['css']);
  gulp.watch(`${config.html.src_dir}/**/*.html`, ['html']);
  gulp.watch(`${config.js.src_dir}/**/*.(j|t)sx?`, ['js']);
  gulp.watch(`${config.assets.src_dir}/**/*`, ['assets']);
});

gulp.task('build', () => {
  return run_sequence('clean', [
    'html',
    'js',
    'css',
    'assets',
  ]);
});

gulp.task('default', ['build']);
