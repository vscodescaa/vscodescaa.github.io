#!/usr/bin/env node

/**
 * build.js
 * -----------------------------------------------------------------------
 * Ensambla index.template.html + sections/*.html en un único index.html
 * final, listo para servir estático (GitHub Pages, o abrir directo con
 * file://).
 *
 * Uso:
 *   node scripts/build.js
 *
 * Cómo funciona:
 *   index.template.html contiene marcadores tipo:
 *     <!-- @include sections/hero.html -->
 *   Este script reemplaza cada marcador con el contenido del archivo
 *   referenciado (rutas relativas a la raíz del repo).
 * -----------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_PATH = path.join(ROOT, "index.template.html");
const OUTPUT_PATH = path.join(ROOT, "index.html");

const INCLUDE_RE = /<!--\s*@include\s+([^\s]+)\s*-->/g;

function build() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`No se encontró la plantilla: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  const output = template.replace(INCLUDE_RE, (match, relativePath) => {
    const includePath = path.join(ROOT, relativePath);

    if (!fs.existsSync(includePath)) {
      console.error(`Archivo incluido no encontrado: ${includePath}`);
      process.exit(1);
    }

    return fs.readFileSync(includePath, "utf8").replace(/\s+$/, "");
  });

  fs.writeFileSync(OUTPUT_PATH, output, "utf8");
  console.log(`✓ index.html generado (${output.length} bytes)`);
}

build();
