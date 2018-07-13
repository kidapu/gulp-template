

// npm 
console.log("test")
const babelRegister = require('babel-register')({
  presets: ['es2015']
})
const gulp = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const $ = loadPlugins()
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const browserSync = require('browser-sync')

// const
let _isDevMode = process.env.NODE_ENV == 'development'
const _srcDir = 'src'
const _outDir = 'public'


gulp.task('webpack', () => {
  let webpackConfig = {
    devtool: _isDevMode ? 'source-map' : 'none',
    entry: {
      app: `./${_srcDir}/app.js`,
    },
    output: {
      path: `${__dirname}/${_outDir}`,
      filename: 'main.js'
    },
    // module: {
    //   loaders: [
    //     {test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'babel-loader'},
    //     {test: /\.json$/, loader: 'json-loader'},
    //   ]
    // },
    // plugins: [
    //   new webpack.DefinePlugin({
    //     'process.env': {
    //       NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    //     }
    //   })
    // ],
  }

  if (_isDevMode == 'development')  
  {
    webpackConfig.devtool = 'inline-source-map'
  } 
 

  return gulp.src('')
    .pipe($.plumber())
    .pipe(webpackStream(webpackConfig, null, (err, stats) => {
      if (!err) {
        $.util.log(stats.toString({
          colors: $.util.colors.supportsColor,
          chunks: !_isDevMode,
          chunkModules: !_isDevMode
        }))
        browserSync.reload()
      }
    }))
    .pipe(gulp.dest(`./${_outDir}`))
})


gulp.task('pug', () => {
  gulp.src(`${_srcDir}/*.pug`)
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest(`./${_outDir}/`))
    .pipe(browserSync.stream());
})

gulp.task('stylus', () => {
  gulp.src(`${_srcDir}/*.styl`)
    .pipe($.plumber() )
    .pipe($.stylus({compress: !_isDevMode}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(`./${_outDir}/`))
    .pipe(browserSync.stream());
})


gulp.task('watch', () => {
  gulp.watch(`./${_srcDir}/*.pug`, ['pug'])
  gulp.watch(`./${_srcDir}/*.styl`, ['stylus'])
  gulp.watch([`./${_srcDir}/*.js`, `./${_srcDir}/lib/*.js`], ['webpack'])
  browserSync.reload();
})

gulp.task('browser-sync', () => {
  browserSync({
    host : 'localhost',
    port : 3000,
    server: { baseDir: `./${_outDir}/`}
  });
})

gulp.task('release', () => {
  developmentMode = false
  process.env.NODE_ENV = 'production'
})

gulp.task('default', ['webpack','pug','stylus', 'watch','browser-sync'])
gulp.task('build', ['release', 'webpack', 'pug', 'stylus'])
