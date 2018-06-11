var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		rename        = require('gulp-rename'),
		notify        = require('gulp-notify'),
		run		  	  = require('run-sequence'),
		webpack 	  = require('webpack-stream');

//server

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: './'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	});
});

gulp.task('html', function() {
	return gulp.src('*.html')
	.pipe(gulp.dest('./'))
	.pipe(browsersync.reload( {stream: true} ));
});

gulp.task('webpack', function () {
	return gulp.src('js/modules/filters.js')
		.pipe(webpack({
			output: {
				filename: 'scripts.js',
			},
			module: {
				rules: [{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					query: {
						presets: ['env']
					}
				}]
			}
		}))
		.pipe(gulp.dest('js/'))
		.pipe(browsersync.reload({ stream: true }));
});

//js optimization
gulp.task('js', function() {
	return gulp.src([
		// 'src/libs/jquery/dist/jquery.min.js',
		'js/scripts.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('js/'))
	.pipe(browsersync.reload({ stream: true }));
});


gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(['js/modules/*.js'], ['webpack']);
	gulp.watch(['js/scripts.js'], ['js']);
	gulp.watch('*.html', ['html']);
});

