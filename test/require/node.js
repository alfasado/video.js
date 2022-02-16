/* eslint-disable no-console */
try {
  require('../../dist/video.js');
} catch (e) {
  console.error(e);
  process.exit(1);
}

process.exit(0);
