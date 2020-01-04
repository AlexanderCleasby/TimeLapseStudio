/* eslint-disable promise/always-return */
const { dialog, app } = require('electron');
const GIFEncoder = require('gifencoder');
const Jimp = require('jimp');
const sizeOf = require('image-size');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
  'app.asar',
  'app.asar.unpacked'
);

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const exportGif = (filePaths, destinationPath, complettionChange, options) => {
  const { speed, scale } = { speed: 500, scale: 1, ...options };
  console.table({ speed, scale });
  return new Promise((resolve, reject) => {
    const dimm = sizeOf(filePaths[0]);
    const encoder = new GIFEncoder(dimm.width * scale, dimm.height * scale);
    const addFrameFromPath = path => {
      Jimp.read(path)
        .then(image => {
          console.log(filePaths[i]);
          image.resize(dimm.width * scale, dimm.height * scale);
          encoder.addFrame(image.bitmap.data);
          complettionChange((i + 1) / filePaths.length);
          i += 1;
          if (i === filePaths.length) {
            encoder.finish();
            return resolve('done');
          }
          return addFrameFromPath(filePaths[i]);
        })
        .catch(err => reject(err));
    };
    encoder.createReadStream().pipe(fs.createWriteStream(destinationPath));
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(speed);
    encoder.setQuality(10);
    let i = 0;
    addFrameFromPath(filePaths[0]);
  });
};

const exportMp4 = (filePaths, destinationPath, complettionChange) =>
  new Promise((resolve, reject) => {
    const temp = `${app.getPath('userData')}/temp.gif`;
    exportGif(filePaths, temp, complettionChange)
      .then(() => {
        ffmpeg(temp)
          .output(destinationPath)
          .on('end', () => {
            console.log('done');
            return resolve();
          })
          .run();
      })
      .catch(err => reject(err));
  });

const exportTypes = {
  mp4: exportMp4,
  gif: exportGif
};

const exportTimeLapse = (arg, complettionChange) =>
  new Promise((resolve, reject) => {
    dialog.showSaveDialog({}, DesPath => {
      const type = DesPath.split('.').slice(-1);
      exportTypes[type](arg.imagePaths, DesPath, complettionChange)
        .then(() => resolve(DesPath))
        .catch(err => reject(err));
    });
  });

module.exports = exportTimeLapse;
