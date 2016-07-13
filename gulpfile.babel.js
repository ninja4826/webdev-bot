import gulp from 'gulp';
import babel from 'gulp-babel';
import install from 'gulp-install';
import jedit from 'gulp-json-editor';
import del from 'del';

const staticFiles = [
  'index.js',
  'nestor.json',
  'README.md'
];

gulp.task('js:clean', () => del('build'));

gulp.task('js:build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/lib'));
});

gulp.task('')

gulp.task('static:clean', del())

gulp.task('deps:clean', () => del('build/package.json'));

gulp.task('deps:build', ['deps:clean'], () => {
  return gulp.src('./package.json')
    .pipe(jedit(json => {
      console.log('pack:', json);
      delete json.devDependencies;
      console.log('new pack:', json);
      
      return json;
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('static:clean', () => del())

gulp.task('install', ['build', 'deps', 'static'], () => {
  return gulp.src('build/package.json')
    .pipe(install());
});