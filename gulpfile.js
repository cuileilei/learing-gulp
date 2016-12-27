const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload
const sass = require("gulp-sass");

gulp.task("sever",function(){
	browserSync.init({
		server:{
			baseDir:"./",
			startPath:"index.html"
		}
	});
	gulp.watch('scss/*.scss',['sass']);
	gulp.watch("js/*.js").on("change",reload)
	gulp.watch('*.html').on('change',reload);
});
gulp.task("sass",function(){
	 gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
});
gulp.task("concat",function(){
	return gulp.src("js/*.js")
		.pipe(concat("all.js"))
		.pipe(gulp.dest("dist/"));
});
gulp.task("uglify",function(){
	return gulp.src("./dist/all.js")
		.pipe(uglify())
		.pipe(rename("all.min.js"))
		.pipe(gulp.dest("dist/"))
});
gulp.task("computer",["concat","uglify"]);
gulp.task("build",["computer"])
