import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import gutil        from 'gulp-util';
import gulpif       from 'gulp-if';
import rupture      from 'rupture';
import stylus       from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import postcss      from 'gulp-postcss';
import assets       from 'postcss-assets';
import cmq          from 'gulp-combine-media-queries';
import minifyCss    from 'gulp-minify-css';
import rename       from 'gulp-rename';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';
import { browsers } from '../../package.json';

gulp.task('styles', () => (
  gulp.src('*.styl', {
      cwd: 'app/styles',
      nonull: true
    })
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(stylus({
      errors: true,
      use: rupture(),
      'include css': true,
      sourcemap: gutil.env.debug ? {
        comment: false,
        inline: true
      } : false
    }))
    .pipe(autoprefixer(
      'Android >= ' + browsers.android,
      'Chrome >= ' + browsers.chrome,
      'Firefox >= ' + browsers.firefox,
      'Explorer >= ' + browsers.ie,
      'iOS >= ' + browsers.ios,
      'Opera >= ' + browsers.opera,
      'Safari >= ' + browsers.safari
    ))
    .pipe(postcss([
      assets({
        loadPaths: ['./app/icons/']
      })
    ]))
    .pipe(cmq())
    //.pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles))
));
