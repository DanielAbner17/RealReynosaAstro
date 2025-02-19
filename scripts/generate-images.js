import { readdirSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lista de carpetas a procesar
const folders = ['anun', 'events', 'homeGallery']; // Agregamos 'homeGallery'

folders.forEach((folder) => {
  const imagesDir = join(__dirname, `../public/images/${folder}`);
  const outputPath = join(__dirname, `../src/data/images/${folder}.js`);

  // Leer todos los archivos de la carpeta de imágenes y filtrar por extensiones válidas
  const files = readdirSync(imagesDir).filter((file) =>
    /\.(jpeg|jpg|png|gif|webp)$/.test(file)
  );

  // Generar un array con las rutas de las imágenes y ordenarlas alfabéticamente
  const images = files.map((file) => `/images/${folder}/${file}`).sort();

  // Escribir el archivo JS con las rutas generadas
  mkdirSync(dirname(outputPath), { recursive: true }); // Crear la carpeta si no existe
  writeFileSync(
    outputPath,
    `export const images = ${JSON.stringify(images, null, 2)};`
  );

  console.log(`✅ Lista de imágenes generada con éxito para ${folder}!`);
});