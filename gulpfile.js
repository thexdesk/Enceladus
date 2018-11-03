const del = require('del');
const gulp = require('gulp');
const html_minifier = require('gulp-html-minifier');
const postcss = require('gulp-postcss');
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const run_sequence = require('run-sequence');
const source = require('vinyl-source-stream');
const uglify = require('rollup-plugin-uglify');

const config = {
  css: {
    src_dir: 'src/css',
  },

  js: {
    src_dir: 'src/js',

    modules: {
      src_dir: 'src/js/modules',
      src_file: 'src/js/modules/index.js',
      out_file: 'modules.bundle.js',
    },

    packages: {
      src_dir: 'src/js/packages',
      src_file: 'src/js/packages/index.js',
      out_file: 'packages.bundle.js',
    },
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
    .pipe(postcss([require('cssnano')]))
    .pipe(rename({ extname: '.bundle.css' }))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('js:modules', () => {
  return rollup({
    input: config.js.modules.src_file,
    format: 'cjs',
    plugins: [uglify],
  })
    .pipe(source(config.js.modules.out_file))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('js:packages', () => {
  return rollup({
    input: config.js.packages.src_file,
    format: 'cjs',
  })
    .pipe(source(config.js.packages.out_file))
    .pipe(gulp.dest(config.out_dir));
});

gulp.task('html', () => {
  return gulp
    .src(`${config.html.src_dir}/*.html`)
    .pipe(preprocess())
    .pipe(html_minifier({ collapseWhitespace: true }))
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
  gulp.watch(`${config.js.modules.src_dir}/**/*.js`, ['js:modules']);
  gulp.watch(`${config.js.packages.src_dir}/**/*.js`, ['js:packages']);
  gulp.watch(`${config.assets.src_dir}/**/*`, ['assets']);
});

gulp.task('build', () => {
  return run_sequence('clean', [
    'html',
    'js:packages',
    'js:modules',
    'css',
    'assets',
  ]);
});

gulp.task('default', ['build']);
