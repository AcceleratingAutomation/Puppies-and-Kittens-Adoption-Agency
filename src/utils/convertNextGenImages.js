const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const async = require('async');

export function convertImage(input, output, quality = 80, callback) {
  sharp(input)
    .webp({ quality })
    .toFile(output, (err, info) => {
      if (err) {
        console.error('Error occurred:', err);
        callback(err);
      } else {
        console.log('Image converted successfully:', info);
        callback(null);
      }
    });
}

function convertAllJpgImagesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const jpgFiles = files.filter(file => path.extname(file) === '.jpg');

    // Convert 4 files in parallel to prevent overloading the CPU
    async.eachLimit(jpgFiles, 4, (file, callback) => {
      const inputPath = path.join(directory, file);
      const outputPath = path.join(directory, path.basename(file, '.jpg') + '.webp');
      convertImage(inputPath, outputPath, 80, callback);
    }, err => {
      if (err) {
        console.error('Error occurred during conversion:', err);
      } else {
        console.log('All images converted successfully');
      }
    });
  });
}

// Only uncomment and run as needed to convert new jpg images
// convertAllJpgImagesInDirectory('../../public/images/dog');