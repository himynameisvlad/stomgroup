import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import plumber      from 'gulp-plumber';
import jade         from 'gulp-jade';
import inheritance  from 'gulp-jade-inheritance';
import cached       from 'gulp-cached';
import clean        from 'gulp-clean';
import filter       from 'gulp-filter';
import rename       from 'gulp-rename';
import prettify     from 'gulp-html-prettify';
import pkg          from '../../package.json';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';


gulp.task('templates', () => (
  gulp.src('app/**/*.jade')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(cached('jade'))
    .pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
    .pipe(filter((file) => /app[\\\/]pages/.test(file.path) || /app[\\\/]views/.test(file.path)))
    .pipe(jade({
      pretty: true
    }))
    .pipe(prettify({
      brace_style: 'expand',
      indent_size: 1,
      indent_char: '\t',
      indent_inner_html: true,
      preserve_newlines: true
    }))
    .pipe(rename({dirname: '.'}))
    .pipe(gulp.dest(paths.dist))
));

gulp.task('clean-views', ['move'], function () {
  return gulp.src('dist/*.tmp.html', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('move', ['templates'], () => (
    gulp.src('dist/*.tmp.html')
    .pipe(gulp.dest(paths.dist + '/views'))
  ))
