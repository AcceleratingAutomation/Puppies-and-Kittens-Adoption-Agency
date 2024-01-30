const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const async = require('async');

function convertImage(input, output, callback, quality = 80) {
  sharp(input)
    .webp({ quality })
    .toFile(output, (err) => {
      if (err) {
        callback(new Error(`Error occurred: ${err}`));
      } else {
        callback(null);
      }
    });
}

function convertAllImagesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      throw new Error(`Error reading directory: ${err}`);
    }

    const imageFiles = files.filter((file) => ['.jpg', '.jpeg', '.png'].includes(path.extname(file)));

    // Convert 4 files in parallel to prevent overloading the CPU
    async.eachLimit(
      imageFiles,
      4,
      (file, callback) => {
        const inputPath = path.join(directory, file);
        const outputPath = path.join(
          directory,
          `${path.basename(file, path.extname(file))}.webp`,
        );
        convertImage(inputPath, outputPath, 80, callback);
      },
      (newErr) => {
        if (newErr) {
          throw new Error(`Error occurred during conversion: ${newErr}`);
        }
      },
    );
  });
}

// Only uncomment and run as needed to convert new images
convertAllImagesInDirectory('../../public/images/placeholders');

module.exports = {
  convertImage,
};
