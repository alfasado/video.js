/* eslint-disable no-var */
/* eslint-env qunit */
var videojs = require('../../dist/video.js');
var videojsCore = require('../../dist/alt/video.core.js');

QUnit.module('Webpack Require');
QUnit.test('videojs should be requirable and bundled via webpack', function(assert) {
  assert.ok(videojs, 'videojs is required properly');
  assert.ok(videojsCore, 'videojs core is required properly');
});
