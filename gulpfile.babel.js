import gulp from 'gulp';
// import babel from 'gulp-babel';
import ts from 'gulp-typescript';
import tslint from 'gulp-tslint';
import install from 'gulp-install';
import jedit from 'gulp-json-editor';
import runSeq from 'run-sequence';
import del from 'del';

const staticFiles = [
  'index.js',
  'nestor.json',
  'README.md'
];

// gulp.task('js:clean', () => del('build/lib'));

// gulp.task('js:build', () => {
//   return gulp.src('src/**/*.js')
//     .pipe(babel())
//     .pipe(gulp.dest('build/lib'));
// });

// gulp.task('js', cb => {
//   runSeq('js:clean', 'js:build', cb);
// });

gulp.task('ts:clean', () => del('build/lib'));

gulp.task('ts:lint', () => {
  gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report());
});

gulp.task('ts:build', () => {
  var tsProject = ts.createProject({
    target: "es5",
    module: "commonjs",
    noImplicitAny: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    noEmitHelpers: true,
    removeComments: true
  });
  
  // var tsResult = tsProject.src()
  //   .pipe(ts(tsProject));
  // return tsResult.js.pipe(gulp.dest('build/lib'));
  
  return gulp.src('src/**/*.ts')
    .pipe(ts(tsProject)).js
    .pipe(gulp.dest('build/lib'));
});

gulp.task('ts', cb => {
  runSeq('ts:clean', 'ts:build', cb);
});

gulp.task('static:clean', () => del(staticFiles.map(f => './build/'+f)));

gulp.task('static:build', () => {
  return gulp.src(staticFiles.map(f => './'+f))
    .pipe(gulp.dest('build'));
});

gulp.task('static', cb => {
  runSeq('static:clean', 'static:build', cb);
});

gulp.task('deps:clean', () => del('build/package.json'));

gulp.task('deps:build', () => {
  return gulp.src('./package.json')
    .pipe(jedit(json => {
      delete json.devDependencies;
      return json;
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('deps', cb => {
  runSeq('deps:clean', 'deps:build', cb);
});

gulp.task('clean', () => del('build'));

gulp.task('pre:install', ['clean'], cb => {
  runSeq([
    // 'js:build',
    'ts:build',
    'static:build',
    'deps:build'
  ], cb);
});

gulp.task('install', ['pre:install'], () => {
  return gulp.src('build/package.json')
    .pipe(install());
});