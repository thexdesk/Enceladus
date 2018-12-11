// tslint:disable no-implicit-dependencies no-unsafe-any

// we have to @ts-ignore imports that don't have type declarations available

import * as del from 'del';
import { dest, lastRun, parallel, series, src, watch as gulp_watch } from 'gulp';
// @ts-ignore
import * as rollup from 'gulp-better-rollup';
import * as html_minifier from 'gulp-htmlmin';
// @ts-ignore
import * as postcss from 'gulp-postcss';
import * as rename from 'gulp-rename';
import * as sourcemaps from 'gulp-sourcemaps';
// @ts-ignore
import * as commonjs from 'rollup-plugin-commonjs';
// @ts-ignore
import * as node_resolve from 'rollup-plugin-node-resolve';
// @ts-ignore
import * as rollup_plugin_postcss from 'rollup-plugin-postcss';
// @ts-ignore
import { terser } from 'rollup-plugin-terser';
// @ts-ignore
import * as typescript from 'rollup-plugin-typescript';
import * as sw_precache from 'sw-precache';

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

export function css(): NodeJS.ReadWriteStream {
  return src(`${config.css.src_dir}/*.pcss`)
    .pipe<NodeJS.ReadWriteStream>((postcss()))
    .pipe(rename({ extname: '.bundle.css' }))
    .pipe(dest(config.out_dir));
}

export function js(): NodeJS.ReadWriteStream {
  return src(config.js.src_file)
    .pipe(sourcemaps.init())
    .pipe<NodeJS.ReadWriteStream>(
      rollup(
        {
          plugins: [
            typescript(),
            rollup_plugin_postcss({
              inject: false,
            }),
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
              },
            }),
          ],
        },
        {
          format: 'iife',
        },
      ),
    )
    .pipe(rename({ basename: 'modules', extname: '.bundle.js' }))
    .pipe(sourcemaps.write('.', { addComment: true }))
    .pipe(dest(config.out_dir));
}

export function sw(): Promise<string> {
  return sw_precache.write(`${config.out_dir}/sw.js`, {
    staticFileGlobs: [`${config.out_dir}/**/*.{js,css,html,ttf}`],
    stripPrefix: config.out_dir,
  });
}

export function html(): NodeJS.ReadWriteStream {
  return src(`${config.html.src_dir}/*.html`, { since: lastRun(html) })
    .pipe(
      html_minifier({
        collapseWhitespace: true,
        decodeEntities: true,
        removeComments: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        collapseBooleanAttributes: true,
      }),
    )
    .pipe(dest(config.out_dir));
}

export function assets(): NodeJS.ReadWriteStream {
  return src(`${config.assets.src_dir}/**/*`, { since: lastRun(assets) })
    .pipe(dest(`${config.out_dir}/${config.assets.out_dir}`));
}

export function clean(): Promise<string[]> {
  return del('dist');
}

export const build = series(clean, parallel(html, js, css, assets), sw);

// tslint:disable-next-line no-shadowed-variable
export const watch = series(build, function watch(): void {
  gulp_watch(`${config.css.src_dir}/**/*.pcss`, series(parallel(js, css), sw));
  gulp_watch(`${config.html.src_dir}/**/*.html`, series(html, sw));
  gulp_watch(`${config.js.src_dir}/**/*.(j|t)s`, series(js, sw));
  gulp_watch(`${config.assets.src_dir}/**/*`, series(assets, sw));
});

// tslint:disable-next-line no-default-export
export default build;
