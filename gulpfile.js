const { src, dest, watch, series } = require("gulp");
const sass = require ('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss')
const autoprefixer  = require('autoprefixer')

function css(done) {
 //compilar sass

 //pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
 src('src/scss/app.scss')
   .pipe(sass())
   //.pipe(sass({outputStyle: 'compressed'})) // con esto le decimos que queremos que el css nos lo haga comprimido, que ocupe lo mínimo
   .pipe(postcss([autoprefixer()])) // para dar soporte a navegadores antiguos que he tenido que especificar en el package.json
   .pipe(dest('build/css')) // este es el archivo que debe compilar
   .pipe(postcss([autoprefixer()])) // para dar soporte a navegadores antiguos que he tenido que especificar en el package.json
   done();
}

const imagemin = require("gulp-imagemin");

function imagenes() {
 return src("src/img/**/*")
  // IMPORTANTE. LA TAREA DE OPTIMIZACIÓN ANTES DE LA TAREA DE COPIAR LA IMAGEN EN BUILD.
   .pipe(imagemin({optimizationLevel: 3})) 
   //imagemin es un plugin que optimiza las imágenes, optimizationLevel: 3 es el nivel de optimización, 3 es el máximo.
   .pipe(dest("build/img"));
}

const webp = require("gulp-webp");

function versionWebp() {
  const opciones = {
    quality: 50 //quality es la calidad de la imagen, 50 es un valor intermedio.
  }
  return src("src/img/**/*.{png,jpg}") //sólo quiero convertir a webp las imágenes png y jpg
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
}

// const avif = require("gulp-avif");

// function versionAvif() {
//  return src("src/img/**/*.{png,jpg}")
//    .pipe(avif())
//    .pipe(dest("build/img"));
// }

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
}

exports.default = series(imagenes,versionWebp,css, dev);